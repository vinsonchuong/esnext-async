export default class {
  requests = [];
  values = [];

  publish(value) {
    if (this.requests.length > 0) {
      this.requests.shift().resolve(value);
    } else {
      this.values.push({value});
    }
  }

  throw(error) {
    if (this.requests.length > 0) {
      this.requests.shift().reject(value);
    } else {
      this.values.push({error});
    }
  }

  consume() {
    return new Promise((resolve, reject) => {
      if (this.values.length === 0) {
        this.requests.push({resolve, reject});
      } else {
        const {value, error} = this.values.shift();
        if (!Object.is(undefined, error)) {
          reject(error)
        } else {
          resolve(value);
        }
      }
    });
  }
}
