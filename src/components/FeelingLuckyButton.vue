<template>
  <div class="feeling-lucky-button">
    <WesternButton
      label="Feeling lucky"
      type="button"
      :aria-label="'Feeling lucky'"
      :disabled="isLoading"
      @click="handleFeelingLucky"
    >
      <template #icon>
        <MdiIcon
          name="CreationOutline"
          class="feeling-lucky-button-icon"
        />
      </template>
    </WesternButton>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

  import MdiIcon from './MdiIcon.vue';
  import WesternButton from './WesternButton.vue';

  const chuckNorrisStore = useChuckNorrisStore();
  const { isLoading } = storeToRefs(chuckNorrisStore);

  const handleFeelingLucky = async () => {
    await chuckNorrisStore.fetchRandomJoke();
  };
</script>
<style scoped lang="scss">
  .feeling-lucky-button {
    @include flex-center;

    .feeling-lucky-button-icon {
      width: 20px;
      height: 20px;
    }
  }
</style>
