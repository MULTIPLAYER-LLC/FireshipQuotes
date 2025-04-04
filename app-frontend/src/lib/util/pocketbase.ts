import PocketBase from 'pocketbase';

import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

import { EventSource } from "eventsource";
import { browser } from '$app/environment';


export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL || "http://pb.fireshipquotes.local");
pb.autoCancellation(false);
export const currentAuth: any = writable(pb.authStore.record);

if(!browser) {
  global.EventSource = EventSource;
}
else {
  // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
  console.log("is my auth valid???", pb.authStore.isValid);
  pb.collection('users')
    .authRefresh()
    .catch(() => pb.authStore.clear() );
}

pb.authStore.onChange(auth => {
  console.log('authStore changed', auth);
  currentAuth.set(pb.authStore.record);
});
