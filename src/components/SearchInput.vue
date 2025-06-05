<template>
  <div class="search-input">
    <div class="input-container">
      <input
        v-model="searchInput"
        id="search-input"
        type="text"
        placeholder="Search for a joke"
        class="input"
        :class="{ 'has-text': searchInput }"
        :disabled="isLoading"
        @focus="showHistory = true"
        @blur="hideHistoryDelayed"
      />
      <button
        v-if="searchInput"
        @click="clearSearch"
        class="clear-button"
        type="button"
        aria-label="Clear search"
      >
        <MdiIcon name="close" />
      </button>

      <Transition name="history-search-dropdown">
        <div v-if="hasSearchHistory && showHistory" class="history-dropdown">
          <div
            v-for="search in recentSearches"
            :key="search.id"
            class="history-item"
            @click="selectHistoryItem(search)"
          >
            <MdiIcon
              name="history"
              class="history-icon"
            />
            <span class="history-query">{{ search.query }}</span>
            <button
              class="history-remove"
              @click.stop="removeHistoryItem(search)"
            >
              <MdiIcon name="close" />
            </button>
          </div>
          <div class="clear-history-section">
            <button
              class="clear-history-button"
              @click="chuckStore.clearSearchHistory()"
            >
              Clear History
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useDebouncer } from '../utils/useDebouncer';
  import { useChuckNorrisStore } from '../store/chuckNorrisStore';
  import type { SearchHistoryItem } from '../interfaces/store/chuckNorrisStore';

  import MdiIcon from './MdiIcon.vue';

  const chuckStore = useChuckNorrisStore();
  const { recentSearches, hasSearchHistory, isLoading, searchTerm } = storeToRefs(chuckStore);
  const searchInput = ref('');
  const showHistory = ref(false);

  watch(searchTerm, (newValue) => {
    searchInput.value = newValue;
  });

  const doSearch = (search: string) => {
    if (search.trim()) {
      chuckStore.searchJokes(search);
    } else {
      chuckStore.clearSearchResults();
    }
  };

  const debouncedSearchInput = useDebouncer(doSearch, 500);

  watch(searchInput, (value) => {
    debouncedSearchInput(value);
  });

  const clearSearch = () => {
    searchInput.value = '';
    chuckStore.clearSearchResults();
  };

  const hideHistoryDelayed = () => {
    setTimeout(() => {
      showHistory.value = false;
    }, 150);
  };

  const selectHistoryItem = (search: SearchHistoryItem) => {
    searchInput.value = search.query;
    showHistory.value = false;
    doSearch(search.query);
  };

  const removeHistoryItem = (search: SearchHistoryItem) => {
    chuckStore.removeFromHistory(search.id);
  };
</script>

<style scoped lang="scss">
.search-input {
  @include flex-column-center;
  padding: 0 $spacing-md;

  .input-container {
    position: relative;
    width: 100%;

    .input {
      @include input-base;
      transition: padding-right 0.2s ease;
      
      &.has-text {
        padding-right: 40px;
      }
      
      &:focus {
        border-color: $color-gold;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .clear-button {
      position: absolute;
      right: $spacing-xs;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: $color-gray-500;
      cursor: pointer;
      padding: 4px;
      @include flex-center;
      z-index: 1;

      &:hover {
        color: $color-danger;
      }
    }

    .history-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: $color-night-sky;
      border: 1px solid $color-moonlight;
      border-radius: $radius-md;
      box-shadow: $shadow-xl;
      z-index: $z-dropdown;
      max-height: 300px;
      overflow-y: auto;
      margin-top: 2px;
      @include custom-scrollbar;

      .history-item {
        @include flex-between;
        padding: $spacing-sm $spacing-md;
        cursor: pointer;
        border-bottom: 1px solid rgba($color-moonlight, 0.1);
        transition: $transition-fast;

        &:hover {
          background-color: rgba($color-moonlight, 0.05);
        }

        &:last-child {
          border-bottom: none;
        }

        .history-icon {
          margin-right: $spacing-sm;
          color: $color-gray-500;
          font-size: 16px;
        }

        .history-query {
          flex: 1;
          color: $color-moonlight;
          font-size: $font-size-sm;
        }

        .history-remove {
          opacity: 0;
          transition: $transition-fast;
          color: $color-gray-400;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: $radius-sm;

          &:hover {
            color: $color-danger;
            background: rgba($color-danger, 0.1);
          }
        }

        &:hover .history-remove {
          opacity: 1;
        }
      }

      .clear-history-section {
        border-top: 1px solid rgba($color-moonlight, 0.2);
        padding: $spacing-xs;

        .clear-history-button {
          width: 100%;
          padding: $spacing-xs;
          background: transparent;
          color: $color-gray-600;
          border: none;
          font-size: $font-size-xs;
          cursor: pointer;
          transition: $transition-fast;

          &:hover {
            color: $color-danger;
          }
        }
      }
    }
  }
}

// Animações da transição
.history-search-dropdown-enter-active {
  transition: all 0.2s ease-out;
}

.history-search-dropdown-leave-active {
  transition: all 0.15s ease-in;
}

.history-search-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.history-search-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>