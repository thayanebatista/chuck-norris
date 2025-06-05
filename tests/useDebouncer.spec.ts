import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDebouncer } from '@/utils/useDebouncer';

describe('useDebouncer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should debounce function calls', () => {
    const callback = vi.fn();
    const debouncedFn = useDebouncer(callback, 500);

    debouncedFn('test');
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledWith('test');
  });
});
