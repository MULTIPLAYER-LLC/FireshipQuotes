import { currentAuth, pb } from '$lib/util/pocketbase';
import { write, subscribe } from '$lib/util/cache';
import { browser } from '$app/environment';
import type { Subscriber, Unsubscriber } from 'svelte/store';

let actives: Map<string, number> = new Map();

export function key(postId: string) {
   return `PostVotes:${postId}`;
}

export async function listen(postId: string, callback: Subscriber<any>): Promise<Unsubscriber> {
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

export async function refresh(): Promise<void> {
  console.log("refreshing all user prior votes");
  const promises = actives.keys().map(e => {
    load(e);
  });
  await Promise.all(promises);
}

export async function load(postId: string): Promise<object> {
  const num_votes = await getNumVotes(postId);
  const prior_vote = await getPriorVote(postId);
  const val = {num_votes, prior_vote};
  write(key(postId), val);
  return val;
}

if(browser) {
  pb.collection('votes').subscribe('*', async e => {
    const postId = e.record.post;
    if(actives.has(postId)) {
      await load(postId);
    }
  });

  pb.authStore.onChange(auth => {
    console.log('detected change in auth, maybe will trigger post vote refresh?')
    if(browser) {
      refresh(); // todo only need to refresh prior votes, not also numvotes
    }
  });
}

async function getNumVotes(postId: string): Promise<number> {
  const voteTypeCounts = await pb.collection('postVoteCount').getList(1, 50, {
    filter: `post="${postId}"`,
  });
  const items = voteTypeCounts?.items || [];
  let sum = 0;
  items.forEach(e => sum += e.num_votes * (e.vote_type === "downvote" ? -1 : 1));
  return sum;
}

async function getPriorVote(postId: string): Promise<any> {
  try {
    const vote_obj: any = await pb.collection('votes').getFirstListItem(`owner="${pb.authStore.record?.id}" && post="${postId}"`);
    return vote_obj;
  } catch(e) {
    return null;
  }
}