import { vi } from 'vitest'

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock do navigator.share
Object.defineProperty(navigator, 'share', {
  value: vi.fn(),
  writable: true
})

// Mock do navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn()
  },
  writable: true
})

// Mock do fetch
global.fetch = vi.fn()

// Limpar mocks antes de cada teste
beforeEach(() => {
  vi.clearAllMocks()
}) 