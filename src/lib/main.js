/* eslint-disable consistent-return, lines-around-comment */
export async function run(fn, ...args) {
  try {
    return await fn(...args);
  } catch (error) {
    setTimeout(() => {
      throw error;
    }, 0);
  }
}
/* eslint-enable consistent-return, lines-around-comment */

export async function loop(fn) {
  await run(async () => {
    /* eslint-disable no-constant-condition, lines-around-comment */
    while (true) {
      await fn();
    }
    /* eslint-enable no-constant-condition, lines-around-comment */
  });
}

export function tryCatch(fn) {
  return async (...args) => await run(fn, ...args);
}
