import { currentAuth, pb } from '$lib/util/pocketbase';
import { write, subscribe } from '$lib/util/cache';
import { browser } from '$app/environment';
import type { Subscriber, Unsubscriber } from 'svelte/store';

let actives: Map<string, number> = new Map();

export function key(postId: string) {
   return `UserPosts:${postId}`;
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
  const postsObj = await getNumPosts(userId);
  const val = {num_posts: postsObj?.num_posts || 0};
  write(key(userId), val);
  return val;
}

if(browser) {
  pb.collection('posts').subscribe('*', async e => {
    const userId = e.record.owner;
    if(actives.has(userId)) {
      await load(userId);
    }
  });
}


async function getNumPosts(userId: string): Promise<any> {
  try {
    const vote_obj: any = await pb.collection('userPostCount').getFirstListItem(`owner="${userId}"`);
    return vote_obj;
  } catch(e) {
    return null;
  }
}