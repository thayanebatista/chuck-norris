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

    width: 100%;
    height: 100%;
    margin-bottom: $spacing-sm;
    font-size: $font-size-sm;
    break-inside: avoid;
    gap: $spacing-xs;
    page-break-inside: avoid;

    @include tablet {
      max-width: 700px;
      padding: $spacing-md;
      font-size: $font-size-md;
      gap: $spacing-sm;
    }

    @include desktop {
      max-width: 800px;
      font-size: $font-size-lg;
      gap: $spacing-md;
    }

    .joke-card-divider {
      height: 1px;
      margin: $spacing-sm 0;
      border-radius: $radius-full;
      background: $gradient-gold-night;
      opacity: 0.6;
    }

    .joke-card-categories {
      display: flex;
      align-items: center;
      font-size: $font-size-xs;
      font-weight: 500;
      letter-spacing: 0.5px;
      color: $color-night-gold;
      opacity: 0.9;
      gap: $spacing-xs;

      @include tablet {
        font-size: $font-size-sm;
        gap: $spacing-sm;
      }

      @include desktop {
        font-size: $font-size-md;
        gap: $spacing-md;
      }

      .joke-card-categories-title {
        font-size: $font-size-xs;
        font-weight: 400;
        letter-spacing: 0.5px;
        color: $color-starlight;
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
          padding: $spacing-xs $spacing-sm;
          border-radius: $radius-md;
          background: $color-black;
          box-shadow: $shadow-md;
          transition: $transition-normal;
          cursor: pointer;

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
        font-weight: 500;
        letter-spacing: 0.5px;
        color: $color-night-gold;
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

        border-radius: $radius-md;
        transition: $transition-normal;

        &:hover {
          background: rgba($color-gold, 0.1);
          box-shadow: $shadow-md;
          transform: scale(1.1);
        }
      }

      .joke-card-footer-icon {
        width: 32px;
        height: 32px;
        border: 2px solid $color-night-gold;
        border-radius: $radius-md;
        box-shadow: $shadow-md;
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
