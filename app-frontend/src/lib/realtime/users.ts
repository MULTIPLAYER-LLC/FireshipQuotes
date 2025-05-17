import { pb } from '$lib/util/pocketbase';
import { write, subscribe } from '$lib/util/cache';
import { browser } from '$app/environment';
import type { Subscriber, Unsubscriber } from 'svelte/store';

let actives: Map<string, number> = new Map();

export function key(userId: string) {
   return `users:${userId}`;
}

export async function listen(userId: string, callback: Subscriber<any>): Promise<Unsubscriber> {
  const activesCount = actives.get(userId) || 0;
  actives.set(userId, activesCount + 1);
  
  const unsub: any = subscribe(key(userId), callback);
  if(activesCount === 0) {
    await load(userId);
  }

  return () => {
    stopListen(userId);
    unsub();
  };
}

export function stopListen(userId: string) {
  const newAmount = (actives.get(userId) || 1) - 1;
  if(newAmount === 0) {
    actives.delete(userId);
  } 
  else {
    actives.set(userId, newAmount);
  }
}

export async function load(userId: string): Promise<object> {
  const val = await pb.collection('users').getOne(userId);
  write(key(userId), val);
  return val;
}

export async function loadRecord(user: any): Promise<object> {
  write(key(user.id), user);
  return user;
}

if(browser) {
  pb.collection('users').subscribe('*', async e => {
    const user = e.record;
    if(actives.has(user.id)) {
      await loadRecord(user);
    }
  });
}
