<template>
  <div class="timed-card">
    <div class="progress-bar">
      <div
        class="progress-bar-fill"
        :style="{ width: `${progress}%` }"
      />
    </div>
    <p class="fact-text">{{ currentFact.value }}</p>
    <footer class="card-footer">
      <p class="source-text">
        {{
          currentFact.type === 'game'
            ? 'Chuck Norris in Games'
            : 'Chuck Norris Facts'
        }}
      </p>
      <a
        href="https://en.wikipedia.org/wiki/Chuck_Norris"
        target="_blank"
        rel="noopener noreferrer"
        class="source-link"
      >
        From Wikipedia, the free encyclopedia
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';

  import chuckNorrisFacts from '@/data/chuckNorrisFacts.json';

  const facts = chuckNorrisFacts;
  const currentIndex = ref(0);
  const progress = ref(100);
  const currentFact = ref(facts[0]);

  let timer: number;
  let progressTimer: number;

  const getRandomIndex = (): number => {
    return Math.floor(Math.random() * facts.length);
  };

  const updateFact = () => {
    currentIndex.value = getRandomIndex();
    currentFact.value = facts[currentIndex.value];
    progress.value = 100;
  };

  onMounted(() => {
    timer = window.setInterval(updateFact, 10000);
    progressTimer = window.setInterval(() => {
      progress.value = Math.max(0, progress.value - 100 / 100);
    }, 100);
  });

  onUnmounted(() => {
    clearInterval(timer);
    clearInterval(progressTimer);
  });
</script>

<style scoped lang="scss">
  .timed-card {
    @include card-night;

    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: $spacing-xs;

    .progress-bar {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      border-radius: $radius-sm;
      background: $color-gray-800;

      &-fill {
        height: 100%;
        background: $gradient-gold-night;
        transition: width 0.1s linear;
      }
    }

    .fact-text {
      @include text-western;

      margin: 0;
      padding-top: $spacing-xs;
      font-size: $font-size-xs;
      line-height: 1.4;
      color: $color-moonlight;
    }

    .card-footer {
      @include flex-row;

      margin-top: $spacing-xs;
      border-top: 1px solid $color-gray-800;
      align-items: center;
      justify-content: space-between;
      font-size: $font-size-2xs;
      font-style: italic;
      text-align: right;

      .source-link {
        text-decoration: none;
        color: $color-moonlight;
        transition: $transition-normal;

        &:hover {
          color: $color-gold;
        }
      }
    }
  }
</style>
