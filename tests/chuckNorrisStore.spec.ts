import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChuckNorrisStore } from '@/store/chuckNorrisStore';
import { chuckNorrisService } from '@/api/chuckNorris.service';

describe('chuckNorrisStore', () => {
  let pinia: ReturnType<typeof createPinia>;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
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

  describe('fetchRandomJoke', () => {
    it('should fetch and set random joke', async () => {
      const mockGetRandomJoke = vi.spyOn(chuckNorrisService, 'getRandomJoke');
      mockGetRandomJoke.mockResolvedValue(mockJoke);

      const store = useChuckNorrisStore();
      await store.fetchRandomJoke();

      expect(mockGetRandomJoke).toHaveBeenCalledOnce();
      expect(store.currentJoke).toEqual(mockJoke);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });
  });

  describe('searchJokes', () => {
    it('should search and set results', async () => {
      const query = 'test';
      const mockSearch = vi.spyOn(chuckNorrisService, 'search');
      mockSearch.mockResolvedValue(mockSearchResult);

      const store = useChuckNorrisStore();
      await store.searchJokes(query);

      expect(mockSearch).toHaveBeenCalledOnce();
      expect(mockSearch).toHaveBeenCalledWith('test');
      expect(store.searchResults).toEqual(mockSearchResult.result);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should handle error when searching', async () => {
      const error = new Error('Network error');
      const mockSearch = vi.spyOn(chuckNorrisService, 'search');
      mockSearch.mockRejectedValue(error);

      const store = useChuckNorrisStore();
      await store.searchJokes('test');

      expect(mockSearch).toHaveBeenCalledOnce();
      expect(mockSearch).toHaveBeenCalledWith('test');
      expect(store.searchResults).toEqual([]);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeTruthy();
    });

    it('should encode query parameters properly', async () => {
      const query = 'test query with spaces';
      const mockSearch = vi.spyOn(chuckNorrisService, 'search');
      mockSearch.mockResolvedValue(mockSearchResult);

      const store = useChuckNorrisStore();
      await store.searchJokes(query);

      expect(mockSearch).toHaveBeenCalledOnce();
      expect(mockSearch).toHaveBeenCalledWith('test%20query%20with%20spaces');
      expect(store.searchResults).toEqual(mockSearchResult.result);
      expect(store.isLoading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('should not search with empty query', async () => {
      const mockSearch = vi.spyOn(chuckNorrisService, 'search');

      const store = useChuckNorrisStore();
      await store.searchJokes('');

      expect(mockSearch).not.toHaveBeenCalled();
      expect(store.searchResults).toEqual([]);
    });

    it('should not search with whitespace only query', async () => {
      const mockSearch = vi.spyOn(chuckNorrisService, 'search');

      const store = useChuckNorrisStore();
      await store.searchJokes('   ');

      expect(mockSearch).not.toHaveBeenCalled();
      expect(store.searchResults).toEqual([]);
    });
  });

  describe('searchHistory', () => {
    it('should add to search history', () => {
      const store = useChuckNorrisStore();
      store.addToSearchHistory('test', 1);

      expect(store.searchHistory.length).toBe(1);
      expect(store.searchHistory[0].query).toBe('test');
      expect(store.searchHistory[0].resultsCount).toBe(1);
    });

    it('should update existing search history item', () => {
      const store = useChuckNorrisStore();
      store.addToSearchHistory('test', 1);
      store.addToSearchHistory('test', 2);

      expect(store.searchHistory.length).toBe(1);
      expect(store.searchHistory[0].resultsCount).toBe(2);
    });

    it('should limit history to 10 items', () => {
      const store = useChuckNorrisStore();
      for (let i = 0; i < 60; i++) {
        store.addToSearchHistory(`test${i}`, i);
      }

      expect(store.searchHistory.length).toBe(10);
    });

    it('should clear search history', () => {
      const store = useChuckNorrisStore();
      store.addToSearchHistory('test', 1);
      store.clearSearchHistory();

      expect(store.searchHistory).toEqual([]);
    });

    it('should remove item from history', () => {
      const store = useChuckNorrisStore();
      store.addToSearchHistory('test', 1);
      const id = store.searchHistory[0].id;
      store.removeFromHistory(id);

      expect(store.searchHistory).toEqual([]);
    });
  });
});
