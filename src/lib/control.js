export async function parallel(...fns) {
  await Promise.all(fns.map((fn) => fn()));
}
