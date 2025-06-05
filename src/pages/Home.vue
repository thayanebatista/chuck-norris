<template>
  <div class="home">
    <Header />
    <div class="home-content">
      <SearchInput />
      <FeelingLuckyButton />

      <LoadingSpinner v-if="isLoading" />

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
            :search-term="searchTerm"
            class="joke-card"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

  import Header from '@/components/Header.vue';
  import JokeCard from '@/components/JokeCard.vue';
  import SearchInput from '@/components/SearchInput.vue';
  import FeelingLuckyButton from '@/components/FeelingLuckyButton.vue';
  import LoadingSpinner from '@/components/LoadingSpinner.vue';
  import ErrorMessage from '@/components/ErrorMessage.vue';

  const chuckNorrisStore = useChuckNorrisStore();
  const {
    searchResults: jokeResults,
    searchTerm,
    currentJoke,
    isLoading,
    error,
  } = storeToRefs(chuckNorrisStore);

  const handleRetry = async () => {
    if (currentJoke.value) {
      await chuckNorrisStore.fetchRandomJoke();
    } else if (searchTerm.value) {
      await chuckNorrisStore.searchJokes(searchTerm.value);
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
    transition: all 0.3s ease;
  }

  .joke-list-enter-from,
  .joke-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .joke-list-move {
    transition: transform 0.3s ease;
  }
</style>
