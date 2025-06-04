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
  background: var(--color-primary);
  color: var(--color-black);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-sm);
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 2px solid var(--color-leather);
  transition: var(--transition-normal);

  &:hover {
    background: var(--gradient-sunset);
    border-color: var(--color-rust);
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    background: var(--color-gray-300);
    color: var(--color-gray-600);
    border-color: var(--color-gray-400);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    text-shadow: none;
  }
}
</style>