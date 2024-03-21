const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const repeat = async (interval: number, callback: () => any) => {
  while (true) {
    await delay(interval);
    await callback();
  }
};
