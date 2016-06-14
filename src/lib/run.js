export default async function run(fn) {
  try {
    return await fn();
  } catch (error) {
    setTimeout(() => {
      throw error;
    }, 0);

    return null;
  }
}
