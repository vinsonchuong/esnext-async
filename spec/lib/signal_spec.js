import {signal} from 'esnext-async';

describe('Signal', () => {
  it('provides the Unix Epoch time', () => {
    expect(signal('time')).toBeCloseTo(new Date().valueOf(), -1);
  });

  it('can represent a constant value', () => {
    expect(signal('one', () => 1)).toBe(1);
  });

  it('represent discrete functions', () => {
    let produce;
    signal.discrete('events', (innerProduce) => {
      produce = innerProduce;
    });

    expect(signal('events')).toBeUndefined();

    produce(1);
    expect(signal('events')).toBe(1);

    produce(2);
    expect(signal('events')).toBe(2);
  });

  it('can combine signals', () => {
    signal('one', () => 1);
    signal('two', () => 2);
    signal('three', (one, two) => one + two);

    expect(signal('three')).toBe(3);
  });

  function testDiscreteSignal(name) {
    let produce;
    signal.discrete(name, (innerProduce) => {
      produce = innerProduce;
    });
    return produce;
  }

  it('can subscribe to changes', () => {
    const changeUsername = testDiscreteSignal('username');
    const changePassword = testDiscreteSignal('password');

    const result = [];
    signal.subscribe((username, password) => {
      result.push([username, password]);
    });

    /* eslint-disable lines-around-comment, no-undefined */
    changeUsername('b');
    expect(result).toEqual([
      ['b', undefined]
    ]);

    changeUsername('bob');
    expect(result).toEqual([
      ['b', undefined],
      ['bob', undefined]
    ]);

    changePassword('p');
    expect(result).toEqual([
      ['b', undefined],
      ['bob', undefined],
      ['bob', 'p']
    ]);

    changeUsername('bobby');
    expect(result).toEqual([
      ['b', undefined],
      ['bob', undefined],
      ['bob', 'p'],
      ['bobby', 'p']
    ]);

    changePassword('password');
    expect(result).toEqual([
      ['b', undefined],
      ['bob', undefined],
      ['bob', 'p'],
      ['bobby', 'p'],
      ['bobby', 'password']
    ]);
    /* eslint-enable lines-around-comment, no-undefined */
  });
});
