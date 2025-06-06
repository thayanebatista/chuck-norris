<template>
  <header class="header">
    <hgroup class="header-content">
      <h1 class="main-title">The greatest Chuck Norris joke?</h1>
      <p class="subtitle">It's always the next one.</p>
    </hgroup>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .header {
    display: flex;
    padding: $spacing-xl;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .header-content {
      text-align: center;

      .main-title {
        @include heading-western-main;
      }

      .subtitle {
        font-size: $font-size-sm;
        font-style: italic;
        opacity: 0.8;

        @include desktop {
          font-size: $font-size-md;
        }

        @include desktop {
          font-size: $font-size-lg;
        }
      }
    }
  }
</style>
