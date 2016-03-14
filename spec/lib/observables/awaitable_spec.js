import {catchError} from 'jasmine-es6'
import {Observable, AwaitableObservable} from 'esnext-async';
import {runTests as observableTests} from 'es-observable-tests';

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
});
