<template>
  <div class="joke-card">
    <HighlightedText
      :text="joke.value"
      :search-term="searchTerm"
    />
    <div class="joke-card-divider" />
    <div
      v-if="joke.categories.length > 0"
      class="joke-card-categories"
    >
      <p class="joke-card-categories-title">Categories:</p>
      <div class="joke-card-categories-list">
        <span
          v-for="category in joke.categories"
          :key="category"
          class="joke-card-category"
        >
          {{ category }}
        </span>
      </div>
    </div>
    <div class="joke-card-footer">
      <span class="joke-card-footer-date">
        {{ format(new Date(joke.created_at), 'dd/MM/yyyy') }}
      </span>
      <a
        :href="joke.url"
        target="_blank"
        class="joke-card-footer-link"
      >
        <img
          :src="joke.icon_url"
          alt="Chuck Norris"
          class="joke-card-footer-icon"
        />
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
    width: 100%;
    height: 100%;
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: $spacing-sm;
    font-size: $font-size-sm;

    @include tablet {
      padding: $spacing-md;
      gap: $spacing-sm;
      max-width: 700px;
      font-size: $font-size-md;
    }

    @include desktop {
      max-width: 800px;
      gap: $spacing-md;
      font-size: $font-size-lg;
    }

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

      @include tablet {
        gap: $spacing-sm;
        font-size: $font-size-sm;
      }

      @include desktop {
        gap: $spacing-md;
        font-size: $font-size-md;
      }

      .joke-card-categories-title {
        font-size: $font-size-xs;
        color: $color-starlight;
        font-weight: 400;
        letter-spacing: 0.5px;
        opacity: 0.7;

        @include tablet {
          font-size: $font-size-sm;
        }

        @include desktop {
          font-size: $font-size-md;
        }
      }

      .joke-card-categories-list {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-xs;

        .joke-card-category {
          cursor: pointer;
          background: $color-black;
          padding: $spacing-xs $spacing-sm;
          border-radius: $radius-md;
          box-shadow: $shadow-md;
          transition: $transition-normal;

          &:hover {
            background: $color-gray-800;
          }
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

        @include tablet {
          font-size: $font-size-sm;
        }

        @include desktop {
          font-size: $font-size-md;
        }
      }

      .joke-card-footer-link {
        @include flex-center;
        transition: $transition-normal;
        border-radius: $radius-md;

        &:hover {
          transform: scale(1.1);
          background: rgba($color-gold, 0.1);
          box-shadow: $shadow-md;
        }
      }

      .joke-card-footer-icon {
        width: 32px;
        height: 32px;
        border-radius: $radius-md;
        box-shadow: $shadow-md;
        border: 2px solid $color-night-gold;
        transition: $transition-normal;

        @include tablet {
          width: 36px;
          height: 36px;
        }

        @include desktop {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
</style>
