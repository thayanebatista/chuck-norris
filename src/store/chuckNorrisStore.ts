import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getErrorMessage } from '../utils/errorHandler';
import { chuckNorrisService } from '../api/chuckNorris.service';

import type {
  ChuckNorrisJoke,
  SearchHistoryItem,
} from '../interfaces/store/chuckNorrisStore';

export const useChuckNorrisStore = defineStore(
  'chuckNorris',
  () => {
    const currentJoke = ref<ChuckNorrisJoke | null>(null);
    const searchResults = ref<ChuckNorrisJoke[]>([]);
    const searchHistory = ref<SearchHistoryItem[]>([]);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const lastSearchQuery = ref<string>('');

    const hasSearchResults = computed(() => searchResults.value.length > 0);
    const hasSearchHistory = computed(() => searchHistory.value.length > 0);

    const fetchRandomJoke = async (): Promise<void> => {
      try {
        isLoading.value = true;
        error.value = null;
        searchResults.value = [];
        lastSearchQuery.value = '';
        currentJoke.value = null;

        const joke = await chuckNorrisService.getRandomJoke();
        currentJoke.value = joke;
      } catch (err) {
        currentJoke.value = null;
        error.value = getErrorMessage(err);
      } finally {
        isLoading.value = false;
      }
    };

    const searchJokes = async (query: string): Promise<void> => {
      const trimmedQuery = query.trim();

      if (isLoading.value && lastSearchQuery.value === trimmedQuery) {
        return;
      }

      currentJoke.value = null;

      if (!trimmedQuery) {
        searchResults.value = [];
        lastSearchQuery.value = '';
        return;
      }

      try {
        isLoading.value = true;
        error.value = null;
        lastSearchQuery.value = trimmedQuery;

        const encodedQuery = encodeURIComponent(trimmedQuery);
        const result = await chuckNorrisService.search(encodedQuery);
        searchResults.value = result.result;

        addToSearchHistory(trimmedQuery, result.total);
      } catch (err) {
        searchResults.value = [];
        error.value = getErrorMessage(err);
      } finally {
        isLoading.value = false;
      }
    };

    const addToSearchHistory = (query: string, resultsCount: number): void => {
      const existingIndex = searchHistory.value.findIndex(
        item => item.query.toLowerCase() === query.toLowerCase(),
      );

      const historyItem: SearchHistoryItem = {
        id: crypto.randomUUID(),
        query,
        timestamp: Date.now(),
        resultsCount,
      };

      if (existingIndex !== -1) {
        searchHistory.value[existingIndex] = historyItem;
      } else {
        searchHistory.value.push(historyItem);
      }

      searchHistory.value = searchHistory.value
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10);
    };

    const clearSearchHistory = (): void => {
      searchHistory.value = [];
    };

    const removeFromHistory = (id: string): void => {
      searchHistory.value = searchHistory.value.filter(item => item.id !== id);
    };

    const clearAll = (): void => {
      currentJoke.value = null;
      searchResults.value = [];
      lastSearchQuery.value = '';
      error.value = null;
    };

    return {
      currentJoke,
      searchResults,
      searchHistory,
      isLoading,
      error,
      lastSearchQuery,
      hasSearchResults,
      hasSearchHistory,

      fetchRandomJoke,
      searchJokes,
      clearSearchHistory,
      removeFromHistory,
      addToSearchHistory,
      clearAll,
    };
  },
  {
    persist: {
      key: 'chuck-norris-store',
      storage: localStorage,
      pick: ['searchHistory'],
    },
  },
);
