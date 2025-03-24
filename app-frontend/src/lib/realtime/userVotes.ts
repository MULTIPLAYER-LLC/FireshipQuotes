import { currentAuth, pb } from '$lib/util/pocketbase';
import { write, subscribe } from '$lib/util/cache';
import { browser } from '$app/environment';
import type { Subscriber, Unsubscriber } from 'svelte/store';

let actives: Map<string, number> = new Map();

export function key(userId: string) {
   return `UserVotes:${userId}`;
}

export async function listen(userId: string, callback: Subscriber<any>): Promise<Unsubscriber> {
  console.log(`realtime +${key(userId)}: ${JSON.stringify(actives)}`);
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
  const num_votes = await getNumVotes(userId);
  const val = {num_votes};
  write(key(userId), val);
  return val;
}

if(browser) {
  pb.collection('votes').subscribe('*', async e => {
    const userId = e.record?.expand?.post?.owner;
    if(actives.has(userId)) {
      console.log(`invoking numVotes load on user ${userId} vote ${e.record.id}`)
      await load(userId);
    }
  }, { expand: 'post' } );
}

async function getNumVotes(userId: string): Promise<number> {
  const voteTypeCounts = await pb.collection('userVoteCount').getList(1, 50, {
    filter: `owner="${userId}"`,
  });
  const items = voteTypeCounts?.items || [];
  let sum = 0;
  items.forEach(e => sum += e.num_votes * (e.vote_type === "downvote" ? -1 : 1));
  return sum;
}
