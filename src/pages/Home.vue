<template>
  <div class="home">
    <Header />
    <div class="home-content">
      <SearchInput />
      <FeelingLuckyButton />

      <ErrorMessage
        v-if="error"
        :message="error"
        :show-retry="true"
        @retry="handleRetry"
      />

      <TransitionGroup name="joke-list">
        <JokeCard
          v-if="currentJoke"
          :joke="currentJoke"
          :search-term="''"
          class="joke-card"
        />
        <div v-if="jokeResults.length > 0">
          <JokeCard
            v-for="joke in jokeResults"
            :key="joke.id"
            :joke="joke"
            :search-term="lastSearchQuery"
            class="joke-card"
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

  const handleRetry = async () => {
    if (currentJoke.value) {
      await chuckNorrisStore.fetchRandomJoke();
    } else if (lastSearchQuery.value) {
      await chuckNorrisStore.searchJokes(lastSearchQuery.value);
    }
  };
</script>

<style scoped lang="scss">
  .home {
    @include flex-column;
    min-height: 100vh;

    .home-content {
      @include flex-column;
      gap: $spacing-sm;
      padding: $spacing-sm;
    }
  }

  .joke-list-enter-active,
  .joke-list-leave-active {
    transition: all 0.4s ease-in-out;
  }

  .joke-list-enter-from,
  .joke-list-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  .joke-list-move {
    transition: transform 0.4s ease-in-out;
  }
</style>
