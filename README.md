# esnext-async
[![Build Status](https://travis-ci.org/vinsonchuong/esnext-async.svg?branch=master)](https://travis-ci.org/vinsonchuong/esnext-async)

Patterns for asynchronous iteration in ES.next

## Installing
`esnext-async` is available as an
[npm package](https://www.npmjs.com/package/esnext-async).

## Usage

### Entry Points

#### Run
```js
import {run} from 'esnext-async';

run(async () => {
  const foo = await fs.readFile('foo');
  await fs.writeFile('bar', foo);
});
```

Execute an `async` function, re-throwing any exceptions and making them fatal.

#### Loop
```js
import {loop} from 'esnext-async';

loop(async () => {
  const value = await observable;
  console.log(value);
});
```

Execute an `async` function over and over, re-throwing any exceptions and
making them fatal. `loop` waits until an "iteration" is complete before
executing the next iteration.

#### TryCatch
```js
import {tryCatch} from 'esnext-async';

app.get('/', tryCatch(async (request, response) => {
  const data = await database.read();
  res.send(data);
}));
```

Wrap an `async` callback function and re-throw any exceptions. `tryCatch` is
useful when passing `async` callback functions to libraries that are unaware
of `async` functions.

### Observables

#### Observable
```js
import {Observable} from 'esnext-async';

const observable = new Observable((observer) => {
  setTimeout(() => {
    observer.next(1);
    setTimeout(() => {
      observer.next(2);
    }, 0);
  }, 0);
});

observable.forEach((value) => {
  console.log(value);
});
```

An implementation of the
[es-observable](https://github.com/zenparsing/es-observable) specification.

#### AwaitableObservable
```js
import {AwaitableObservable} from 'esnext-async';

const observable = new Observable((observer) => {
  setTimeout(() => {
    observer.next(1);
    setTimeout(() => {
      observer.next(2);
    }, 0);
  }, 0);
});

const value1 = await observable;
const value2 = await observable;
```

An observable that behaves like a promise that can be resolved multiple times.
The `AwaitableObservable` provides more control over when to process values by
eliminating callbacks.

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```
