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
  import { useDebouncer } from '@/utils/useDebouncer';
  import { useChuckNorrisStore } from '@/store/chuckNorrisStore';
  import type { SearchHistoryItem } from '@/interfaces/store/chuckNorrisStore';

  import MdiIcon from '@/components/MdiIcon.vue';
  import WesternButton from '@/components/WesternButton.vue';

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
        max-width: 700px;
        margin: 0 auto;
        padding: 0 $spacing-lg;
      }

      @include desktop {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 $spacing-xl;
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
        top: 50%;
        right: $spacing-xs;
        z-index: 1;
        padding: $spacing-xs;
        border: none;
        color: $color-gray-500;
        background: transparent;
        transform: translateY(-50%);
        cursor: pointer;

        @include flex-center;

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
        overflow-y: auto;
        position: absolute;
        top: 100%;
        right: 0;
        left: 0;
        z-index: $z-dropdown;
        max-height: 300px;
        margin-top: 2px;
        border: 1px solid $color-moonlight;
        border-radius: $radius-md;
        background: $color-night-sky;
        box-shadow: $shadow-xl;

        @include custom-scrollbar;

        @include tablet {
          right: $spacing-lg;
          left: $spacing-lg;
        }

        @include desktop {
          right: $spacing-xl;
          left: $spacing-xl;
        }

        .history-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .history-item {
          @include flex-between;

          padding: $spacing-sm $spacing-md;
          border-bottom: 1px solid rgba($color-moonlight, 0.1);
          transition: $transition-fast;
          cursor: pointer;

          &:hover {
            background-color: rgba($color-moonlight, 0.05);
          }

          &:last-child {
            border-bottom: none;
          }

          .history-icon {
            margin-right: $spacing-sm;
            font-size: $font-size-sm;
            color: $color-gray-500;
          }

          .history-query {
            flex: 1;
            font-size: $font-size-sm;
            color: $color-moonlight;
          }

          .history-remove {
            padding: $spacing-xs;
            border: none;
            border-radius: $radius-sm;
            color: $color-gray-400;
            background: none;
            opacity: 0;
            transition: $transition-fast;
            cursor: pointer;

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
          padding: $spacing-xs;
          border-top: 1px solid rgba($color-moonlight, 0.2);

          .clear-history-button {
            width: 100%;
            padding: $spacing-xs;
            border: none;
            font-size: $font-size-xs;
            color: $color-gray-600;
            background: transparent;
            transition: $transition-fast;
            cursor: pointer;
          }
        }

        .clear-history-button:hover {
          color: $color-danger;
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
