import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Home from '@/pages/Home.vue';
import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

vi.mock('@/components/Header.vue', () => ({
  default: { template: '<div class="header-mock">Header</div>' },
}));

vi.mock('@/components/SearchInput.vue', () => ({
  default: { template: '<div class="search-input-mock">SearchInput</div>' },
}));

vi.mock('@/components/FeelingLuckyButton.vue', () => ({
  default: { template: '<div class="feeling-lucky-mock">FeelingLucky</div>' },
}));

vi.mock('@/components/ErrorMessage.vue', () => ({
  default: {
    template:
      '<div class="error-message"><p class="error-text">{{ message }}</p></div>',
    props: ['message', 'showRetry'],
  },
}));

vi.mock('@/components/JokeCard.vue', () => ({
  default: {
    template: '<div class="joke-card">{{ joke.value }}</div>',
    props: ['joke', 'searchTerm'],
  },
}));

vi.mock('@/components/NoResultsCard.vue', () => ({
  default: { template: '<div class="no-results-card">No jokes found</div>' },
}));

describe('Home.vue', () => {
  let pinia: ReturnType<typeof createPinia>;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('should render error message when there is an error', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: 'Test error',
      currentJoke: null,
      searchResults: [],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.error-message').exists()).toBe(true);
    expect(wrapper.find('.error-text').text()).toBe('Test error');
  });

  it('should render joke card when there is a current joke', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: null,
      currentJoke: {
        id: '1',
        value: 'Test joke',
        url: 'http://test.com',
        icon_url: 'http://test.com/icon.png',
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        categories: [],
      },
      searchResults: [],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.joke-card').exists()).toBe(true);
    expect(wrapper.find('.joke-card').text()).toContain('Test joke');
  });

  it('should render joke cards when there are search results', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: null,
      currentJoke: null,
      lastSearchQuery: 'test',
      searchResults: [
        {
          id: '1',
          value: 'Test joke 1',
          url: 'http://test.com/1',
          icon_url: 'http://test.com/icon1.png',
          created_at: '2024-01-01',
          updated_at: '2024-01-01',
          categories: [],
        },
        {
          id: '2',
          value: 'Test joke 2',
          url: 'http://test.com/2',
          icon_url: 'http://test.com/icon2.png',
          created_at: '2024-01-01',
          updated_at: '2024-01-01',
          categories: [],
        },
      ],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    const jokeCards = wrapper.findAll('.joke-card');
    expect(jokeCards).toHaveLength(2);

    expect(jokeCards[0].text()).toContain('Test joke 1');
    expect(jokeCards[1].text()).toContain('Test joke 2');

    expect(store.hasSearchResults).toBe(true);
  });

  it('should not render error message when there is no error', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: null,
      currentJoke: null,
      searchResults: [],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.error-message').exists()).toBe(false);
  });

  it('should render NoResultsCard when search term exists but no results', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: null,
      currentJoke: null,
      lastSearchQuery: 'non-existent-term',
      searchResults: [],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.no-results-card').exists()).toBe(true);
  });

  it('should not render NoResultsCard when no search term', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: null,
      currentJoke: null,
      lastSearchQuery: '',
      searchResults: [],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.no-results-card').exists()).toBe(false);
  });

  it('should not render NoResultsCard when there are search results', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: null,
      currentJoke: null,
      lastSearchQuery: 'test',
      searchResults: [
        {
          id: '1',
          value: 'Test joke',
          url: 'http://test.com',
          icon_url: 'http://test.com/icon.png',
          created_at: '2024-01-01',
          updated_at: '2024-01-01',
          categories: [],
        },
      ],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.no-results-card').exists()).toBe(false);
  });

  it('should not render NoResultsCard when there is an error', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: false,
      error: 'Test error',
      currentJoke: null,
      lastSearchQuery: 'test',
      searchResults: [],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.no-results-card').exists()).toBe(false);
  });

  it('should not render NoResultsCard when loading', async () => {
    const store = useChuckNorrisStore();

    store.$patch({
      isLoading: true,
      error: null,
      currentJoke: null,
      lastSearchQuery: 'test',
      searchResults: [],
    });

    const wrapper = mount(Home, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.no-results-card').exists()).toBe(false);
  });
});
