<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="loading-overlay"
      role="status"
      aria-label="Loading"
      @click.stop
      @keydown.stop
    >
      <div class="loading-content">
        <div class="spinner" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  defineProps<{
    visible: boolean;
  }>();
</script>

<style scoped lang="scss">
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-full;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color-black, 0.8);
    user-select: none;
    pointer-events: all;
    backdrop-filter: blur(4px);

    @include flex-center;

    .loading-content {
      @include flex-column;

      .spinner {
        width: 60px;
        height: 60px;
        border: 4px solid $color-night-gold;
        border-radius: $radius-full;
        animation: spin 1.2s linear infinite;
        border-top-color: transparent;
      }
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
