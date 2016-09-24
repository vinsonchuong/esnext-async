export async function parallel(...fns) {
  await Promise.all(fns.map((fn) => fn()));
}

export async function sleep(ms = 0) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
