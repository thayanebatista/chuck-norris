<template>
  <button
    class="button"
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    {{ label }}
    <slot name="icon" />
  </button>
</template>

<script setup lang="ts">
  interface ButtonProps {
    label: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    ariaLabel?: string;
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    type: 'button',
    disabled: false,
    ariaLabel: undefined
  });

  const emit = defineEmits<{
    click: [];
  }>();

  const handleClick = () => {
    if (!props.disabled) {
      emit('click');
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