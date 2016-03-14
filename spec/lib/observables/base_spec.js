import {Observable} from 'esnext-async';
import {runTests as observableTests} from 'es-observable-tests';

describe('Observable', async () => {
  it('conforms to the es-observable spec', async () => {
    const {logger: {failed}} = await observableTests(Observable);
    expect(failed).toBe(0);
  });
});
