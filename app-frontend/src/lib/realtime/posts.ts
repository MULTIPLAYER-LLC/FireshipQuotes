import { pb } from '$lib/util/pocketbase';
import { write, subscribe } from '$lib/util/cache';
import { browser } from '$app/environment';
import type { Subscriber, Unsubscriber } from 'svelte/store';

let actives: Map<string, number> = new Map();

export function key(postId: string) {
   return `posts:${postId}`;
}

export async function listen(postId: string, callback: Subscriber<any>): Promise<Unsubscriber> {
  console.log(`realtime +${key(postId)}: ${JSON.stringify(actives)}`);
  const activesCount = actives.get(postId) || 0;
  actives.set(postId, activesCount + 1);
  
  const unsub: any = subscribe(key(postId), callback);
  if(activesCount === 0) {
    await load(postId);
  }

  return () => {
    stopListen(postId);
    unsub();
  };
}

export function stopListen(postId: string) {
  const newAmount = (actives.get(postId) || 1) - 1;
  if(newAmount === 0) {
    actives.delete(postId);
  } 
  else {
    actives.set(postId, newAmount);
  }
}

export async function load(postId: string): Promise<object> {
  const val = await pb.collection('posts').getOne(postId);
  write(key(postId), val);
  return val;
}

export async function loadRecord(post: any): Promise<object> {
  write(key(post.id), post);
  return post;
}

if(browser) {
  pb.collection('posts').subscribe('*', async e => {
    const post = e.record;
    if(actives.has(post.id)) {
      await loadRecord(post);
    }
  });
}
