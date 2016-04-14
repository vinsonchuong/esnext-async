import {signal} from 'esnext-async';

describe('Signal', () => {
  it('provides the Unix Epoch time', () => {
    expect(signal('time')).toBeCloseTo(new Date().valueOf(), -1);
  });

  it('can represent a constant value', () => {
    expect(signal('one', () => 1)).toBe(1);
  });

  it('can combine signals', () => {
    signal('one', () => 1);
    signal('two', () => 2);
    signal('three', (one, two) => one + two);

    expect(signal('three')).toBe(3);
  });
});
