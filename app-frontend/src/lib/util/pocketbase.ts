import PocketBase from 'pocketbase';

import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

import { EventSource } from "eventsource";
import { browser } from '$app/environment';

if(!browser) {
  global.EventSource = EventSource;
}

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL || "http://pb.fireshipquotes.local");
pb.autoCancellation(false);

export const currentAuth: any = writable(pb.authStore.record);

pb.authStore.onChange(auth => {
  console.log('authStore changed', auth);
  currentAuth.set(pb.authStore.record);
});
