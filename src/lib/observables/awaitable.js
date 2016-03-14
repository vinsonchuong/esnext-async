import Observable from 'zen-observable';

export default class extends Observable {
  constructor(subscribe) {
    super(subscribe);
    this.refreshPromise();
    this.subscribe({
      next: (value) => {
        this.resolve(value);
        this.refreshPromise();
      },
      error: (error) => {
        this.reject(error);
        this.refreshPromise();
      }
    });
  }

  then(...args) {
    return this.promise.then(...args);
  }

  catch(...args) {
    return this.promise.catch(...args);
  }

  refreshPromise() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
