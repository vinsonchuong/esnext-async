import {catchError} from 'jasmine-es6';
import {parallel} from 'esnext-async';
import PromiseQueue from 'esnext-async/lib/promise_queue';

describe('PromiseQueue', () => {
  it('can publish and consume a single value', async () => {
    const queue = new PromiseQueue();
    queue.publish(1);
    expect(await queue.consume()).toBe(1);
  });

  it('can publish and consume multiple values', async () => {
    const queue = new PromiseQueue();
    queue.publish(1);
    queue.publish(2);
    expect(await queue.consume()).toBe(1);
    expect(await queue.consume()).toBe(2);
  });

  it('can block when the queue is empty', async () => {
    const queue = new PromiseQueue();

    await parallel(
      async () => expect(await queue.consume()).toBe(1),
      async () => expect(await queue.consume()).toBe(2),
      () => {
        queue.publish(1);
        queue.publish(2);
      }
    );
  });

  it('can propagate errors', async () => {
    const queue = new PromiseQueue();
    queue.throw(new Error('Error'));
    expect(await catchError(queue.consume())).toBe('Error');
  });
});
