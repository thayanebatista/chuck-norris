<template>
  <div class="home">
    <Header />
    <div class="home-content">
      <SearchInput />
      <FeelingLuckyButton />
      <JokeCard
        v-if="currentJoke"
        :joke="currentJoke"
        :search-term="''"
        class="joke-card"
      />
      <JokeCard
        v-if="jokeResults.length > 0"
        v-for="joke in jokeResults"
        :key="joke.id"
        :joke="joke"
        :search-term="searchTerm"
        class="joke-card"
      />
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

  const chuckNorrisStore = useChuckNorrisStore();
  const { searchResults: jokeResults, searchTerm, currentJoke } = storeToRefs(chuckNorrisStore);

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
</style>