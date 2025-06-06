<template>
  <div class="home">
    <Header />

    <div class="home-content">
      <SearchInput />

      <FeelingLuckyButton />

      <ErrorMessage
        v-if="error"
        :message="error"
      />

      <TransitionGroup name="joke-list">
        <JokeCard
          v-if="currentJoke"
          :joke="currentJoke"
          :search-term="''"
        />
        <div
          v-if="jokeResults.length > 0"
          class="jokes-list"
        >
          <JokeCard
            v-for="joke in jokeResults"
            :key="joke.id"
            :joke="joke"
            :search-term="lastSearchQuery"
          />
        </div>
        <NoResultsCard
          v-if="shouldShowNoResults"
          class="no-results"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

  import Header from '@/components/Header.vue';
  import JokeCard from '@/components/JokeCard.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import FeelingLuckyButton from '@/components/FeelingLuckyButton.vue';
  import ErrorMessage from '@/components/ErrorMessage.vue';
  import NoResultsCard from '@/components/NoResultsCard.vue';

  const chuckNorrisStore = useChuckNorrisStore();
  const {
    searchResults: jokeResults,
    currentJoke,
    error,
    isLoading,
    lastSearchQuery,
  } = storeToRefs(chuckNorrisStore);

  const shouldShowNoResults = computed(() => {
    return (
      lastSearchQuery.value.trim() !== '' &&
      jokeResults.value.length === 0 &&
      !currentJoke.value &&
      !error.value &&
      !isLoading.value
    );
  });
</script>

<style scoped lang="scss">
  .home {
    @include flex-column;
    min-height: 100vh;

    .home-content {
      @include flex-column;
      gap: $spacing-sm;
      padding: $spacing-sm;

      .jokes-list {
        @include flex-column-center;
        width: 100%;
        gap: $spacing-sm;

        @include desktop {
          display: block;
          columns: 2;
          column-gap: $spacing-lg;
          max-width: 1000px;
          margin: 0 auto;
        }
      }
    }
  }

  .joke-list-enter-active,
  .joke-list-leave-active {
    transition: $transition-slow;
  }

  .joke-list-enter-from,
  .joke-list-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  .joke-list-move {
    transition: $transition-slow;
  }
</style>
