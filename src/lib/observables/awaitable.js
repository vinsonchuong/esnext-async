import Observable from 'zen-observable';
import PromiseQueue from 'esnext-async/lib/promise_queue';

export default class extends Observable {
  constructor(subscribe) {
    super(subscribe);
    this.queue = new PromiseQueue();
    this.subscribe({
      next: ::this.queue.publish,
      error: ::this.queue.throw
    });
  }

  then(...args) {
    return this.queue.consume().then(...args);
  }
}
