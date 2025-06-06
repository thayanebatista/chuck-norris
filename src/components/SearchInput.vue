<template>
  <div class="search-input">
    <div class="input-container">
      <input
        id="search-input"
        v-model="searchInput"
        type="text"
        placeholder="Search for a joke"
        class="input"
        :class="{ 'has-text': searchInput }"
        :disabled="isLoading"
        aria-label="Search for Chuck Norris jokes"
        @input="onInputChange"
        @focus="showHistory = true"
        @blur="hideHistoryDelayed"
      />
      <WesternButton
        v-if="searchInput"
        class="clear-button"
        type="button"
        :disabled="false"
        aria-label="Clear search"
        @click="clearSearch"
      >
        <template #icon>
          <MdiIcon
            name="close"
            aria-hidden="true"
          />
        </template>
      </WesternButton>

      <Transition name="history-search-dropdown">
        <div
          v-if="hasSearchHistory && showHistory"
          class="history-dropdown"
        >
          <ul
            class="history-list"
            aria-label="Search history"
          >
            <li
              v-for="search in searchHistory"
              :key="search.id"
              class="history-item"
              @click="selectHistoryItem(search)"
            >
              <MdiIcon
                name="history"
                class="history-icon"
                aria-hidden="true"
              />
              <span class="history-query">{{ search.query }}</span>
              <WesternButton
                type="button"
                :disabled="false"
                class="history-remove"
                aria-label="Remove from history"
                @click.stop="removeHistoryItem(search)"
              >
                <template #icon>
                  <MdiIcon
                    name="close"
                    aria-hidden="true"
                  />
                </template>
              </WesternButton>
            </li>
          </ul>
          <div class="clear-history-section">
            <WesternButton
              class="clear-history-button"
              type="button"
              label="Clear History"
              :disabled="false"
              aria-label="Clear history"
              @click="chuckStore.clearSearchHistory()"
            />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useDebouncer } from '../utils/useDebouncer';
  import { useChuckNorrisStore } from '../store/chuckNorrisStore';
  import type { SearchHistoryItem } from '../interfaces/store/chuckNorrisStore';

  import MdiIcon from './MdiIcon.vue';
  import WesternButton from './WesternButton.vue';

  const chuckStore = useChuckNorrisStore();
  const { searchHistory, hasSearchHistory, isLoading } =
    storeToRefs(chuckStore);
  const searchInput = ref('');
  const showHistory = ref(false);

  const doSearch = (search: string) => {
    if (search.trim()) {
      chuckStore.searchJokes(search);
    } else {
      chuckStore.clearAll();
    }
  };

  const debouncedSearchInput = useDebouncer(doSearch, 500);

  const handleInputChange = (value: string) => {
    debouncedSearchInput(value);
  };

  const onInputChange = () => {
    handleInputChange(searchInput.value);
  };

  const clearSearch = () => {
    searchInput.value = '';
    chuckStore.clearAll();
  };

  const hideHistoryDelayed = () => {
    setTimeout(() => {
      showHistory.value = false;
    }, 150);
  };

  const selectHistoryItem = (search: SearchHistoryItem) => {
    searchInput.value = search.query;
    showHistory.value = false;
    chuckStore.searchJokes(search.query);
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

      @include tablet {
        padding: 0 $spacing-lg;
        max-width: 700px;
        margin: 0 auto;
      }

      @include desktop {
        padding: 0 $spacing-xl;
        max-width: 1000px;
        margin: 0 auto;
      }

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
        padding: $spacing-xs;
        @include flex-center;
        z-index: 1;

        &:hover {
          color: $color-danger;
        }

        @include tablet {
          padding: $spacing-lg;
        }

        @include desktop {
          padding: $spacing-2xl;
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

        @include tablet {
          left: $spacing-lg;
          right: $spacing-lg;
        }

        @include desktop {
          left: $spacing-xl;
          right: $spacing-xl;
        }

        .history-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

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
