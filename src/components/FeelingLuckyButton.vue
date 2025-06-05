<template>
  <div class="feeling-lucky-button">
    <Button label="Feeling lucky" @click="handleFeelingLucky" :aria-label="'Feeling lucky'" :disabled="isLoading">
      <template #icon>
        <MdiIcon name="CreationOutline" class="feeling-lucky-button-icon" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

import Button from './Button.vue';
import MdiIcon from './MdiIcon.vue';

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