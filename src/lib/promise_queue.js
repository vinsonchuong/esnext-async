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
    return new Promise((resolve) => {
      if (this.values.length === 0) {
        this.requests.push(resolve);
      } else {
        resolve(this.values.shift());
      }
    });
  }
}
