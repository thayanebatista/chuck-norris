<template>
  <div class="no-results-card">
    <div class="no-results-content">
      <div class="message-container">
        <h2>Chuck Norris Hid These Jokes!</h2>
        <p>Even Chuck Norris couldn't find jokes matching your search...</p>
        <p>
          But don't worry, Chuck Norris doesn't search - he just waits for jokes
          to find him!
        </p>
      </div>
      <div class="gif-container">
        <img
          :src="randomGif"
          :alt="'Chuck Norris GIF'"
          class="random-gif"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const availableGifs: string[] = [
    'chuck-norris-approves.gif',
    'chuck-norris-game.gif',
    'chuck-norris-karate.gif',
    'chuck-norris-sheriff.gif',
  ];

  const randomGif = computed(() => {
    const randomIndex = Math.floor(Math.random() * availableGifs.length);
    return new URL(
      `../assets/gifs/${availableGifs[randomIndex]}`,
      import.meta.url,
    ).href;
  });
</script>

<style scoped lang="scss">
  .no-results-card {
    @include flex-center;

    min-height: 400px;
    margin: 0 auto;
    padding: $spacing-lg;
    border: 2px solid $color-night-gold;
    border-radius: $radius-lg;
    animation: fadeInUp 0.5s ease-out;

    .no-results-content {
      @include flex-column;
      @include flex-center;

      max-width: 500px;
      text-align: center;

      .gif-container {
        @include flex-center;

        overflow: hidden;
        border-radius: $radius-md;

        .random-gif {
          width: auto;
          max-width: 300px;
          height: auto;
          border-radius: $radius-md;
          object-fit: cover;
        }
      }

      .message-container {
        @include flex-column;

        gap: $spacing-sm;

        h2 {
          @include heading-secondary;
        }

        p {
          @include text-western;

          &:last-child {
            font-style: italic;
          }
        }
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
</style>
