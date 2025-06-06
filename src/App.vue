<template>
  <div class="app">
    <Home />
    <LoadingSpinner :visible="isLoading" />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

  import Home from '@/pages/Home.vue';
  import LoadingSpinner from '@/components/LoadingSpinner.vue';

  const chuckNorrisStore = useChuckNorrisStore();
  const { isLoading } = storeToRefs(chuckNorrisStore);
</script>

<style scoped lang="scss">
  .app {
    width: 100%;
    height: 100%;
  }
</style>
