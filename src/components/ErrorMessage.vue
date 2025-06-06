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
  </div>
</template>

<script setup lang="ts">
  import MdiIcon from './MdiIcon.vue';

  defineProps<{
    message: string;
  }>();
</script>

<style scoped lang="scss">
  .error-message {
    position: fixed;
    bottom: $spacing-lg;
    left: 50%;
    transform: translateX(-50%);
    z-index: $z-toast;

    @include flex-column;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-lg;
    background: rgba($color-danger, 0.1);
    border: 1px solid $color-danger;
    border-radius: $radius-md;

    backdrop-filter: blur(10px);
    box-shadow: $shadow-md;

    animation: slideUp 0.3s ease-out;
    max-width: 90vw;
    min-width: 300px;

    .error-icon {
      color: $color-danger;
      width: 24px;
      height: 24px;
    }

    .error-text {
      color: $color-danger;
      text-align: center;
      font-size: $font-size-sm;
      margin: 0;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>
