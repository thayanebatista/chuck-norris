import { describe, it, expect, vi } from 'vitest'
import { useDebouncer } from '@/utils/useDebouncer'

describe('useDebouncer', () => {
  it('should call the callback after the specified delay', async () => {
    const callback = vi.fn()
    const debouncedFn = useDebouncer(callback, 100)
    
    debouncedFn('test')
    
    // Callback não deve ser chamado imediatamente
    expect(callback).not.toHaveBeenCalled()
    
    // Aguardar o delay
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Agora o callback deve ter sido chamado
    expect(callback).toHaveBeenCalledWith('test')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should cancel previous calls when called multiple times', async () => {
    const callback = vi.fn()
    const debouncedFn = useDebouncer(callback, 100)
    
    debouncedFn('first')
    debouncedFn('second')
    debouncedFn('third')
    
    // Aguardar o delay
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Apenas a última chamada deve ter sido executada
    expect(callback).toHaveBeenCalledWith('third')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should handle multiple arguments correctly', async () => {
    const callback = vi.fn()
    const debouncedFn = useDebouncer(callback, 50)
    
    debouncedFn('arg1', 'arg2', 123)
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })
}) 