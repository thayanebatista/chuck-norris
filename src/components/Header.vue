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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-xl;

    .header-content {
      text-align: center;

      .main-title {
        @include heading-western-main;
      }

      .subtitle {
        font-size: $font-size-sm;
        opacity: 0.8;
        font-style: italic;

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
