export default class {
  requests = [];
  values = [];

  publish(value) {
    if (this.requests.length > 0) {
      this.requests.shift()(value);
    } else {
      this.values.push(value);
    }
  }

  consume() {
    if (this.values.length === 0) {
      return new Promise((resolve) => {
        this.requests.push(resolve);
      });
    } else {
      return Promise.resolve(this.values.shift());
    }
  }
}
