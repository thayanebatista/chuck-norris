<template>
  <div class="lucky-button-container">
    <button
      class="lucky-button"
      :disabled="isLoading"
      @click="handleLuckyClick"
      aria-label="Get a random Chuck Norris joke"
    >
      <MdiIcon 
        v-if="!isLoading" 
        name="dice6" 
        class="lucky-button__icon" 
      />
      <MdiIcon 
        v-else 
        name="loading" 
        class="lucky-button__icon lucky-button__icon--spinning" 
      />
      <span class="lucky-button__text">
        {{ isLoading ? 'Getting Lucky...' : "I'm Feeling Lucky" }}
      </span>
    </button>
    
    <!-- Lucky Result - Layout diferenciado -->
    <Transition name="lucky-result" mode="out-in">
      <div v-if="showLuckyResult && currentJoke" class="lucky-result">
        <div class="lucky-result__badge">
          <MdiIcon name="star" class="lucky-result__star" />
          <span>Lucky Find!</span>
          <MdiIcon name="star" class="lucky-result__star" />
        </div>
        
        <article class="lucky-result__card">
          <div class="lucky-result__content">
            <blockquote class="lucky-result__quote">
              "{{ currentJoke.value }}"
            </blockquote>
            
            <footer class="lucky-result__footer">
              <div class="lucky-result__meta">
                <div class="lucky-result__categories" v-if="currentJoke.categories.length">
                  <MdiIcon name="tag" class="lucky-result__category-icon" />
                  <span 
                    v-for="category in currentJoke.categories" 
                    :key="category"
                    class="lucky-result__category"
                  >
                    {{ category }}
                  </span>
                </div>
                
                <div class="lucky-result__date">
                  <MdiIcon name="calendar" class="lucky-result__date-icon" />
                  <time :datetime="currentJoke.created_at">
                    {{ formatDate(currentJoke.created_at) }}
                  </time>
                </div>
                
                <div class="lucky-result__id">
                  <MdiIcon name="identifier" class="lucky-result__id-icon" />
                  <span>ID: {{ currentJoke.id.slice(0, 8) }}...</span>
                </div>
              </div>
              
              <div class="lucky-result__actions">
                <button 
                  class="lucky-result__action lucky-result__action--share"
                  @click="shareJoke"
                  aria-label="Share this joke"
                >
                  <MdiIcon name="share" />
                  Share
                </button>
                
                <a 
                  :href="currentJoke.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="lucky-result__action lucky-result__action--external"
                  aria-label="View on ChuckNorris.io"
                >
                  <MdiIcon name="openInNew" />
                  Source
                </a>
                
                <button 
                  class="lucky-result__action lucky-result__action--again"
                  @click="handleLuckyClick"
                  aria-label="Get another lucky joke"
                >
                  <MdiIcon name="refresh" />
                  Lucky Again
                </button>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useChuckNorrisStore } from '../store/chuckNorrisStore';
import MdiIcon from './MdiIcon.vue';

const chuckStore = useChuckNorrisStore();
const { currentJoke, isLoading } = storeToRefs(chuckStore);

const showLuckyResult = ref(false);

const handleLuckyClick = async () => {
  showLuckyResult.value = false;
  
  await chuckStore.fetchRandomJoke();
  
  if (currentJoke.value) {
    // Pequeno delay para melhor UX
    setTimeout(() => {
      showLuckyResult.value = true;
    }, 300);
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const shareJoke = async () => {
  if (!currentJoke.value) return;
  
  const shareData = {
    title: 'Chuck Norris Joke',
    text: currentJoke.value.value,
    url: currentJoke.value.url
  };
  
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(
        `${currentJoke.value.value}\n\nSource: ${currentJoke.value.url}`
      );
      // Aqui você poderia mostrar um toast de sucesso
      console.log('Joke copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing joke:', error);
  }
};
</script>

<style scoped lang="scss">
.lucky-button-container {
  @include flex-column-center;
  margin: $spacing-xl 0;
  gap: $spacing-lg;
}

.lucky-button {
  @include btn-western;
  @include flex-center;
  gap: $spacing-sm;
  font-size: $font-size-lg;
  padding: $spacing-md $spacing-xl;
  position: relative;
  overflow: hidden;
  
  // Efeito especial para o botão lucky
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba($color-gold, 0.1),
      transparent
    );
    transform: rotate(45deg);
    transition: $transition-slow;
    opacity: 0;
  }
  
  &:hover::before {
    animation: shimmer 1.5s ease-in-out;
  }
  
  &__icon {
    font-size: 20px;
    
    &--spinning {
      animation: spin 1s linear infinite;
    }
  }
  
  &__text {
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%) rotate(45deg); opacity: 0; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

// Lucky Result - Layout especial diferente dos search results
.lucky-result {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  
  &__badge {
    @include flex-center;
    gap: $spacing-xs;
    background: $gradient-gold;
    color: $color-black;
    padding: $spacing-xs $spacing-md;
    border-radius: $radius-full;
    font-weight: 700;
    font-size: $font-size-sm;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: $spacing-md;
    box-shadow: $shadow-lg;
    
    @include mobile {
      font-size: $font-size-xs;
      padding: $spacing-xs $spacing-sm;
    }
  }
  
  &__star {
    color: $color-campfire;
    animation: twinkle 2s ease-in-out infinite;
  }
  
  &__card {
    @include card-western;
    background: $gradient-night;
    border-color: $color-gold;
    color: $color-moonlight;
    box-shadow: 
      $shadow-xl,
      0 0 30px rgba($color-gold, 0.2);
    
    // Efeito especial para o card lucky
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba($color-gold, 0.1) 0%,
        transparent 50%,
        rgba($color-gold, 0.05) 100%
      );
      pointer-events: none;
      border-radius: inherit;
    }
  }
  
  &__content {
    position: relative;
    z-index: 1;
  }
  
  &__quote {
    font-size: $font-size-xl;
    line-height: 1.6;
    margin: 0 0 $spacing-lg 0;
    font-style: italic;
    text-align: center;
    position: relative;
    
    @include mobile {
      font-size: $font-size-lg;
    }
    
    // Aspas decorativas
    &::before,
    &::after {
      content: '"';
      font-size: 3em;
      color: $color-gold;
      position: absolute;
      opacity: 0.3;
      font-family: Georgia, serif;
    }
    
    &::before {
      top: -0.2em;
      left: -0.3em;
    }
    
    &::after {
      bottom: -0.5em;
      right: -0.3em;
    }
  }
  
  &__footer {
    border-top: 1px solid rgba($color-gold, 0.2);
    padding-top: $spacing-md;
  }
  
  &__meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
    
    @include mobile {
      grid-template-columns: 1fr;
      gap: $spacing-xs;
    }
  }
  
  &__categories,
  &__date,
  &__id {
    @include flex-center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-gray-300;
    
    @include mobile {
      justify-content: flex-start;
    }
  }
  
  &__category {
    background: rgba($color-gold, 0.2);
    color: $color-gold;
    padding: 2px $spacing-xs;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    text-transform: capitalize;
  }
  
  &__actions {
    @include flex-center;
    gap: $spacing-sm;
    flex-wrap: wrap;
    
    @include mobile {
      justify-content: center;
    }
  }
  
  &__action {
    @include btn-base;
    @include flex-center;
    gap: $spacing-xs;
    font-size: $font-size-sm;
    padding: $spacing-xs $spacing-sm;
    text-decoration: none;
    border-radius: $radius-md;
    transition: $transition-normal;
    
    &--share {
      background: rgba($color-info, 0.2);
      color: $color-info;
      border: 1px solid $color-info;
      
      &:hover {
        background: $color-info;
        color: $color-white;
      }
    }
    
    &--external {
      background: rgba($color-warning, 0.2);
      color: $color-warning;
      border: 1px solid $color-warning;
      
      &:hover {
        background: $color-warning;
        color: $color-black;
      }
    }
    
    &--again {
      background: rgba($color-success, 0.2);
      color: $color-success;
      border: 1px solid $color-success;
      
      &:hover {
        background: $color-success;
        color: $color-white;
      }
    }
  }
}

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

// Transições
.lucky-result-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.lucky-result-leave-active {
  transition: all 0.3s ease-in;
}

.lucky-result-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.lucky-result-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(1.05);
}
</style> 