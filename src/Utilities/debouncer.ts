let timerId: string | number | NodeJS.Timeout | undefined;
export const debounce = (fn: Function, name: string, delay: number) => {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    fn(name);
  }, delay);
};
