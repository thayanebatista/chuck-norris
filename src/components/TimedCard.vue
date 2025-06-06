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
      <p class="source-text">Chuck Norris Facts</p>
      <a
        href="https://pt.wikipedia.org/wiki/Chuck_Norris"
        target="_blank"
        rel="noopener noreferrer"
        class="source-link"
      >
        Fonte: Wikipédia
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

  const updateFact = () => {
    currentIndex.value = (currentIndex.value + 1) % facts.length;
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
    padding: $spacing-xs;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;

    .progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: $color-gray-800;
      border-radius: $radius-sm;
      overflow: hidden;

      &-fill {
        height: 100%;
        background: $gradient-gold-night;
        transition: width 0.1s linear;
      }
    }

    .fact-text {
      @include text-western;
      font-size: $font-size-xs;
      color: $color-moonlight;
      margin: 0;
      padding-top: $spacing-xs;
      line-height: 1.4;
    }

    .card-footer {
      @include flex-row;
      justify-content: space-between;
      align-items: center;
      margin-top: $spacing-xs;
      border-top: 1px solid $color-gray-800;
      text-align: right;
      font-size: $font-size-xs;
      font-style: italic;

      .source-link {
        color: $color-moonlight;
        text-decoration: none;
        transition: $transition-normal;

        &:hover {
          color: $color-gold;
        }
      }
    }
  }
</style>
