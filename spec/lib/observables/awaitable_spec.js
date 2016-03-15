import {catchError} from 'jasmine-es6';
import {Observable, AwaitableObservable} from 'esnext-async';

describe('AwaitableObservable', () => {
  it('inherits from Observable', async () => {
    expect(AwaitableObservable.of).toEqual(jasmine.any(Function));
    expect(new AwaitableObservable(() => {}) instanceof Observable)
      .toBe(true);
  });

  it('allows users to await each value', async () => {
    const observable = new AwaitableObservable((observer) => {
      setTimeout(() => {
        observer.next(1);
        setTimeout(() => {
          observer.next(2);
          setTimeout(() => {
            observer.error(new Error('error'));
          }, 0);
        }, 0);
      }, 0);
    });

    expect(await observable).toBe(1);
    expect(await observable).toBe(2);
    expect(await catchError(observable)).toBe('error');
  });

  it('supports chained transforms', async () => {
    const observable = new AwaitableObservable((observer) => {
      setTimeout(() => {
        observer.next(1);
        setTimeout(() => {
          observer.next(2);
        }, 0);
      }, 0);
    })
      .map((value) => 2 * value);

    expect(observable instanceof AwaitableObservable).toBe(true);
    expect(await observable).toBe(2);
    expect(await observable).toBe(4);
  });
});
