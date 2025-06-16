<template>
  <span class="highlighted-text">
    <template
      v-for="(part, index) in highlightedParts"
      :key="index"
    >
      <span
        v-if="part.match"
        :class="props.highlightClass"
        >{{ part.text }}</span
      >
      <span v-else>{{ part.text }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useTextHighlight } from '@/composables/useTextHighlight';

  const props = withDefaults(
    defineProps<{
      text: string;
      searchTerm: string;
      highlightClass?: string;
    }>(),
    {
      highlightClass: 'highlight',
    },
  );

  const { highlightedParts } = useTextHighlight(
    computed(() => props.text),
    computed(() => props.searchTerm),
  );
</script>

<style scoped lang="scss">
  .highlighted-text {
    .highlight {
      font-weight: bold;
      color: black;
      background-color: yellow;
    }
  }
</style>
