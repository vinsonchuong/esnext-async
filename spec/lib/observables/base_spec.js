import {Observable} from 'esnext-async';
import {runTests as observableTests} from 'es-observable-tests';

async function values(observable) {
  const results = [];
  await observable.forEach((value) => {
    results.push(value);
  });
  return results;
}

describe('Observable', async () => {
  it('conforms to the es-observable spec', async () => {
    const {logger: {failed}} = await observableTests(Observable);
    expect(failed).toBe(0);
  });

  it('includes a map transform', async () => {
    const observable = Observable.of(1, 2, 3).map((value) => value * 2);
    expect(await values(observable)).toEqual([2, 4, 6]);
  });

  it('includes a filter transform', async () => {
    const observable = Observable.of(1, 2, 3).filter((value) => value % 2 === 0);
    expect(await values(observable)).toEqual([2]);
  });

  it('includes a flatMap transform', async () => {
    const observable = Observable.of(1, 2, 3)
      .flatMap((value) => [value, 2 * value]);
    expect(await values(observable)).toEqual([1, 2, 2, 4, 3, 6]);
  });
});
