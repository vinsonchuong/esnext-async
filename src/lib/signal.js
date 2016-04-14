export default class Signal {
  static fromConstant(constant) {
    return new Signal(() => constant);
  }

  constructor(read) {
    this.read = read;
  }

  valueOf() {
    return this.read();
  }
}

Signal.time = new Signal(() => new Date().valueOf())
