<template>
  <button
    class="button"
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel || label"
    @click="handleClick($event)"
  >
    {{ label }}
    <slot name="icon" />
  </button>
</template>

<script setup lang="ts">
  import { ButtonProps } from '@/interfaces/components/button';

  const props = defineProps<ButtonProps>();

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const handleClick = (event: MouseEvent) => {
    if (!props.disabled) {
      emit('click', event);
    }
  };
</script>

<style scoped lang="scss">
  .button {
    @include flex-center;
    gap: $spacing-xs;
    background: $color-leather;
    color: $color-starlight;
    border: 1px solid $color-gray-700;
    border-radius: $radius-md;
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-sm;
    font-weight: 500;
    transition: all $transition-normal;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity $transition-normal;
    }

    &:hover:not(:disabled) {
      background: $color-gray-900;
      border-color: $color-night-gold;
      transform: translateY(-1px);
      box-shadow: $shadow-md;

      &::before {
        opacity: 0.1;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: $shadow-sm;
    }

    &:disabled {
      background: $color-gray-700;
      color: $color-gray-500;
      border-color: $color-gray-600;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
</style>
