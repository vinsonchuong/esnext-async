import {Observable} from 'esnext-async';
import {runTests as observableTests} from 'es-observable-tests'

describe('esnext-async', () => {
  it('includes a standard implementation of Observable', async () => {
    const {logger: {failed}} = await observableTests(Observable);
    expect(failed).toBe(0);
  });
});
