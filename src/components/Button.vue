<template>
  <button
    class="button"
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    {{ label }}
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
  @include btn-western;
  
  font-size: $font-size-sm;
  padding: $spacing-xs $spacing-sm;
  
  &:hover:not(:disabled) {
    background: $gradient-sunset;
    border-color: $color-rust;
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    box-shadow: $shadow-sm;
    transform: translateY(-1px);
  }

  &:disabled {
    background: $color-gray-300;
    color: $color-gray-600;
    border-color: $color-gray-400;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    text-shadow: none;
    opacity: 0.6;
  }
}
</style>