<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    :fill="color"
    role="img"
    aria-hidden="true"
  >
    <path :d="icon" />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import * as icons from '@mdi/js';

  interface Props {
    name: string;
    size?: number | string;
    color?: string;
  }

  const props = defineProps<Props>();

  const size = computed(() => props.size ?? 24);
  const color = computed(() => props.color ?? 'currentColor');

  const icon = computed(() => {
    const name = props.name.charAt(0).toUpperCase() + props.name.slice(1);
    const key = `mdi${name}`;
    return (icons as Record<string, string>)[key] ?? '';
  });
</script>
