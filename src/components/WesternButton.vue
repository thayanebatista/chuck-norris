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

    overflow: hidden;
    position: relative;
    padding: $spacing-xs $spacing-md;
    border: 1px solid $color-gray-700;
    border-radius: $radius-md;
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-starlight;
    background: $color-leather;
    transition: all $transition-normal;
    cursor: pointer;
    gap: $spacing-xs;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity $transition-normal;
      content: '';
    }

    &:disabled {
      border-color: $color-gray-600;
      color: $color-gray-500;
      background: $color-gray-700;
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      border-color: $color-night-gold;
      background: $color-gray-900;
      box-shadow: $shadow-md;
      transform: translateY(-1px);

      &::before {
        opacity: 0.1;
      }
    }

    &:active:not(:disabled) {
      box-shadow: $shadow-sm;
      transform: translateY(0);
    }
  }
</style>
