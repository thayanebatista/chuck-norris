<template>
  <div
    v-if="message"
    class="error-message"
    role="alert"
    aria-live="assertive"
  >
    <MdiIcon
      name="alert"
      class="error-icon"
    />
    <p class="error-text">{{ message }}</p>
    <WesternButton
      v-if="showRetry"
      type="button"
      class="retry-button"
      label="Try again"
      :disabled="false"
      aria-label="Try again"
      @click="$emit('retry')"
    >
      <template #icon>
        <MdiIcon
          name="refresh"
          aria-hidden="true"
        />
      </template>
    </WesternButton>
  </div>
</template>

<script setup lang="ts">
  import MdiIcon from './MdiIcon.vue';
  import WesternButton from './WesternButton.vue';

  defineProps<{
    message: string;
    showRetry?: boolean;
  }>();

  defineEmits<(e: 'retry') => void>();
</script>

<style scoped lang="scss">
  .error-message {
    @include flex-column;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md;
    background: rgba($color-danger, 0.1);
    border: 1px solid $color-danger;
    border-radius: $radius-md;
    margin: $spacing-sm 0;
    animation: fadeIn 0.3s ease-in-out;

    .error-icon {
      color: $color-danger;
      width: 24px;
      height: 24px;
    }

    .error-text {
      color: $color-danger;
      text-align: center;
      font-size: $font-size-sm;
    }

    .retry-button {
      padding: $spacing-xs $spacing-sm;
      background: $color-danger;
      color: $color-white;
      border: none;
      border-radius: $radius-sm;
      cursor: pointer;
      transition: $transition-normal;

      &:hover {
        background: darken($color-danger, 10%);
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
