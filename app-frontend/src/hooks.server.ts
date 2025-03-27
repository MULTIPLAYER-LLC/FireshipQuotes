import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private'

const pb = new PocketBase(env.PRIVATE_POCKETBASE_URL);

export const handle: Handle = async ({ event, resolve }) => {
  const locals: any = event.locals;
  locals.pb = pb;

  // load the store data from the request cookie string
  locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
      // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
      locals.pb.authStore.isValid && await locals.pb.collection('users').authRefresh();
  } catch (_) {
      // clear the auth store on failed refresh
      locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append('set-cookie', locals.pb.authStore.exportToCookie());
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (event.request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: response.headers });
  }

  return response;
};
