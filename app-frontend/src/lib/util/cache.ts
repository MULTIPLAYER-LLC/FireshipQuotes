import { writable, get as getValue, type Writable, type Subscriber, type Unsubscriber } from 'svelte/store';

const cache = new Map<string, Writable<any>>();
const subscriptions = new Map<string, any[]>();

export function read(id: string, generate: () => any = () => null): Writable<any> {
  if(!cache.has(id)) {
    const newValue = generate();
    cache.set(id, writable(newValue));
  }
  const res: any = cache.get(id);
  return res;
}

export function subscribe(id: string, callback: Subscriber<any>): Unsubscriber|undefined {
  const unsub = read(id)?.subscribe(callback);
  const existings = subscriptions.get(id) || [];
  existings.push(unsub);
  return unsub;
}

export function write(id: string, value: any): void {
  read(id)?.set(value);
}

export function remove(id: string): void {
  write(id, null); // hmm should `remove` be responsible for doing this? tough call
  (subscriptions.get(id) || []).forEach(e => e && e());
  cache.delete(id);
}
