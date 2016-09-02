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
      this.requests.shift().reject(error);
    } else {
      this.values.push({error});
    }
  }

  consume() {
    return new Promise((resolve, reject) => {
      if (this.values.length === 0) {
        this.requests.push({resolve, reject});
      } else {
        const item = this.values.shift();
        if ('error' in item) {
          reject(item.error);
        } else {
          resolve(item.value);
        }
      }
    });
  }
}
