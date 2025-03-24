// import { pb } from '$lib/util/pocketbase';
// import { write, subscribe } from '$lib/util/cache';
// import { browser } from '$app/environment';
// import type { Subscriber, Unsubscriber } from 'svelte/store';

// const actives: Map<string, number> = new Map();

// export function key(namespace: string, id: string) {
//    return `${namespace}:${id}`;
// }

// export async function listen(k: string, generate: () => any, callback: Subscriber<any>): Promise<Unsubscriber> {
//   console.log(`realtime +${k}: ${JSON.stringify(actives)}`);
//   const activesCount = actives.get(k) || 0;
//   actives.set(k, activesCount + 1);

//   const unsub: any = subscribe(k, callback);
//   if(activesCount > 0) {
//     load(k, await generate());
//   }

//   return () => {
//     stopListen(k);
//     unsub();
//   };
// }

// export function stopListen(k: string) {
//   const newAmount = (actives.get(k) || 1) - 1;
//   if(newAmount === 0) {
//     actives.delete(k);
//   } 
//   else {
//     actives.set(k, newAmount);
//   }
// }

// export function load(k: string, v: any): Promise<object> {
//   write(k, v);
//   return v;
// }

// if(browser) {
//   pb.collection('users').subscribe('*', async e => {
//     const user = e.record;
//     if(actives.has(user.id)) {
//       await load(user.id, user);
//     }
//   });
// }
