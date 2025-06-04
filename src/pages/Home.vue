<template>
  <div class="home">
    <Header />
    <div class="home-content">
      <SearchInput />
      <JokeCard
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

  const chuckNorrisStore = useChuckNorrisStore();
  const { searchResults: jokeResults, searchTerm } = storeToRefs(chuckNorrisStore);

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