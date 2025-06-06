<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-gif">
        <img
          src="@/assets/gifs/chuck-norris-footer.gif"
          alt="Chuck Norris Footer"
          class="chuck-gif"
        />
      </div>
      <div class="footer-info">
        <p>Developed with 💜 by Thay</p>
        <a
          href="https://github.com/thayanebatista"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
        >
          <MdiIcon name="Github" /> GitHub
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import MdiIcon from '@/components/MdiIcon.vue';
</script>

<style scoped lang="scss">
  .footer {
    margin-top: auto;
    padding: $spacing-xs $spacing-sm;
    background-color: $color-night-sky;
    border-top: 1px solid $color-gray-900;

    .footer-content {
      @include flex-column;
      @include flex-center;
      max-width: 100%;

      @include mobile {
        flex-direction: column;
        text-align: center;
      }
    }

    .footer-info {
      @include flex-row;
      gap: $spacing-xs;

      p {
        color: $color-white;
        font-size: $font-size-xs;
        margin: $spacing-xs 0;
      }

      .github-link {
        @include flex-row-center;
        gap: $spacing-xs;
        color: $color-primary;
        text-decoration: none;
        font-size: $font-size-xs;
        transition: color $transition-fast;

        &:hover {
          color: $color-primary-dark;
        }

        i {
          margin-right: $spacing-xs;
        }
      }
    }

    .footer-gif {
      .chuck-gif {
        width: 40px;
        height: auto;
        border-radius: $radius-sm;
      }
    }
  }
</style>
