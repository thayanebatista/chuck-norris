export function useDebouncer<T extends unknown[]>(
  callback: (...args: T) => void,
  ms: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debouncedFunction(...args: T): void {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, ms);
  };
}
