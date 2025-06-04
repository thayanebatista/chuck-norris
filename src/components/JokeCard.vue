<template>
  <div class="joke-card">
    <HighlightedText 
      :text="joke.value" 
      :search-term="searchTerm" 
    />
    <div class="joke-card-divider" />
    <div v-if="joke.categories.length > 0" class="joke-card-categories">
      <p class="joke-card-categories-title">Categories:</p>
      <div class="joke-card-categories-list">
        <span v-for="category in joke.categories" :key="category" class="joke-card-category">
          {{ category }}
        </span>
      </div>
    </div>
    <div class="joke-card-footer">
      <span class="joke-card-footer-date">
        {{ format(new Date(joke.created_at), 'dd/MM/yyyy') }}
      </span>
      <a :href="joke.url" target="_blank" class="joke-card-footer-link">
        <img :src="joke.icon_url" alt="Chuck Norris" class="joke-card-footer-icon" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HighlightedText from '@/components/HighlightedText.vue';

  import { format } from 'date-fns';
  import type { ChuckNorrisJoke } from '@/interfaces/store/chuckNorrisStore';

  defineProps<{
    joke: ChuckNorrisJoke;
    searchTerm: string;
  }>();
</script>

<style scoped lang="scss">
.joke-card {
  @include card-night;
  @include flex-column;
  gap: $spacing-xs;

  .joke-card-divider {
    height: 1px;
    background: $gradient-gold-night;
    opacity: 0.6;
    margin: $spacing-sm 0;
    border-radius: $radius-full;
  }

  .joke-card-categories {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-xs;
    color: $color-night-gold;
    font-weight: 500;
    letter-spacing: 0.5px;
    opacity: 0.9;

    .joke-card-categories-list {
      display: flex;
      flex-wrap: wrap;
      gap: $spacing-xs;
      
      .joke-card-category {
        background: rgba($color-gold, 0.1);
        padding: $spacing-xs $spacing-sm;
        border-radius: $radius-md;
        box-shadow: $shadow-md;
      }
    }
  }

  .joke-card-footer {
    @include flex-between;
    align-items: center;

    .joke-card-footer-date {
      font-size: $font-size-xs;
      color: $color-night-gold;
      font-weight: 500;
      letter-spacing: 0.5px;
      opacity: 0.9;
    }

    .joke-card-footer-link {
      @include flex-center;
      transition: $transition-normal;
      border-radius: $radius-md;
      
      &:hover {
        transform: scale(1.1);
        background: rgba($color-gold, 0.1);
        box-shadow: 0 0 15px rgba($color-gold, 0.3);
      }
    }

    .joke-card-footer-icon {
      width: 32px;
      height: 32px;
      border-radius: $radius-md;
      box-shadow: $shadow-md;
      border: 2px solid $color-night-gold;
      transition: $transition-normal;
    }
  }
}
</style>
