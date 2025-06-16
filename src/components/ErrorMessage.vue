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
  import MdiIcon from '@/components/MdiIcon.vue';

  defineProps<{
    message: string;
  }>();
</script>

<style scoped lang="scss">
  .error-message {
    position: fixed;
    bottom: $spacing-lg;
    left: 50%;
    z-index: $z-toast;
    min-width: 300px;
    max-width: 90vw;
    padding: $spacing-md $spacing-lg;
    border: 1px solid $color-danger;
    border-radius: $radius-md;
    align-items: center;
    background: rgba($color-danger, 0.1);
    box-shadow: $shadow-md;
    transform: translateX(-50%);
    animation: slideUp 0.3s ease-out;
    backdrop-filter: blur(10px);
    gap: $spacing-sm;

    @include flex-column;

    .error-icon {
      width: 24px;
      height: 24px;
      color: $color-danger;
    }

    .error-text {
      margin: 0;
      font-size: $font-size-sm;
      text-align: center;
      color: $color-danger;
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
