import {Signal} from 'esnext-async';

describe('Signal', () => {
  describe('.time', () => {
    it('represents the Unix Epoch time', () => {
      expect(Signal.time.valueOf())
        .toBeCloseTo(new Date().valueOf(), -1);
    });
  });

  describe('.fromConstant()', () => {
    it('represents a constant value', () => {
      const one = Signal.fromConstant(1);
      expect(one.valueOf()).toEqual(1);
    });
  });
});
