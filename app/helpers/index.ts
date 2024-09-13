export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = (fn: () => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
};
