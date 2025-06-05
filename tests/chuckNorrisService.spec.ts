import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chuckNorrisService } from '@/api/chuckNorris.service';

const mockFetch = (response: unknown, ok = true) => {
  return vi.spyOn(global, 'fetch').mockResolvedValue({
    ok,
    json: () => Promise.resolve(response),
  } as Response);
};

describe('chuckNorrisService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockJoke = {
    id: '1',
    value: 'Test joke',
    url: 'http://test.com',
    icon_url: 'http://test.com/icon.png',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    categories: [],
  };

  const mockSearchResult = {
    total: 1,
    result: [mockJoke],
  };

  describe('getRandomJoke', () => {
    it('should fetch random joke successfully', async () => {
      mockFetch(mockJoke);

      const result = await chuckNorrisService.getRandomJoke();
      expect(result).toEqual(mockJoke);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.chucknorris.io/jokes/random',
        { method: 'GET' },
      );
    });

    it('should handle 404 error', async () => {
      mockFetch(null, false);

      await expect(chuckNorrisService.getRandomJoke()).rejects.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        'https://api.chucknorris.io/jokes/random',
        { method: 'GET' },
      );
    });

    it('should handle server error', async () => {
      mockFetch(null, false);

      await expect(chuckNorrisService.getRandomJoke()).rejects.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        'https://api.chucknorris.io/jokes/random',
        { method: 'GET' },
      );
    });

    it('should handle network error', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

      await expect(chuckNorrisService.getRandomJoke()).rejects.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        'https://api.chucknorris.io/jokes/random',
        { method: 'GET' },
      );
    });
  });

  describe('search', () => {
    it('should search jokes successfully', async () => {
      const query = 'test';
      mockFetch(mockSearchResult);

      const result = await chuckNorrisService.search(query);
      expect(result).toEqual(mockSearchResult);
      expect(fetch).toHaveBeenCalledWith(
        `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`,
        { method: 'GET' },
      );
    });

    it('should handle 404 error', async () => {
      const query = 'test';
      mockFetch(null, false);

      await expect(chuckNorrisService.search(query)).rejects.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`,
        { method: 'GET' },
      );
    });

    it('should handle server error', async () => {
      const query = 'test';
      mockFetch(null, false);

      await expect(chuckNorrisService.search(query)).rejects.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`,
        { method: 'GET' },
      );
    });

    it('should handle network error', async () => {
      const query = 'test';
      vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

      await expect(chuckNorrisService.search(query)).rejects.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        `https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`,
        { method: 'GET' },
      );
    });
  });
});
