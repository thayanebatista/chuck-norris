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
    const searchTerm = ref<string>('');
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
        searchTerm.value = '';
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
      searchTerm.value = query;
      currentJoke.value = null;

      if (!query.trim()) {
        searchResults.value = [];
        return;
      }

      try {
        isLoading.value = true;
        error.value = null;
        lastSearchQuery.value = query.trim();

        const encodedQuery = encodeURIComponent(query.trim());
        const result = await chuckNorrisService.search(encodedQuery);

        searchResults.value = result.result;

        addToSearchHistory(query.trim(), result.total);
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
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

    const repeatSearch = async (query: string): Promise<void> => {
      await searchJokes(query);
    };

    const clearSearchResults = (): void => {
      searchResults.value = [];
      lastSearchQuery.value = '';
    };

    const clearError = (): void => {
      error.value = null;
    };

    const resetStore = (): void => {
      currentJoke.value = null;
      searchResults.value = [];
      searchHistory.value = [];
      searchTerm.value = '';
      isLoading.value = false;
    };

    return {
      currentJoke,
      searchResults,
      searchHistory,
      isLoading,
      error,
      lastSearchQuery,
      searchTerm,
      hasSearchResults,
      hasSearchHistory,

      fetchRandomJoke,
      searchJokes,
      addToSearchHistory,
      clearSearchHistory,
      removeFromHistory,
      repeatSearch,
      clearSearchResults,
      clearError,
      resetStore,
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
