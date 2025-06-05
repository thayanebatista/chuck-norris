import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import JokeCard from '@/components/JokeCard.vue';
import type { ChuckNorrisJoke } from '@/interfaces/store/chuckNorrisStore';

describe('JokeCard', () => {
  const mockJoke: ChuckNorrisJoke = {
    id: '1',
    value: 'Chuck Norris can divide by zero.',
    url: 'https://api.chucknorris.io/jokes/1',
    icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    created_at: '2024-01-01T12:00:00.000Z',
    updated_at: '2024-01-01T12:00:00.000Z',
    categories: ['nerdy'],
  };

  it('should render joke card with all elements', () => {
    const wrapper = mount(JokeCard, {
      props: {
        joke: mockJoke,
        searchTerm: '',
      },
    });

    expect(wrapper.find('.joke-card').exists()).toBe(true);
    expect(wrapper.find('.joke-card-divider').exists()).toBe(true);
    expect(wrapper.find('.joke-card-categories').exists()).toBe(true);
    expect(wrapper.find('.joke-card-footer').exists()).toBe(true);
  });

  it('should display joke text', () => {
    const wrapper = mount(JokeCard, {
      props: {
        joke: mockJoke,
        searchTerm: '',
      },
    });

    expect(wrapper.text()).toContain(mockJoke.value);
  });

  it('should display categories when present', () => {
    const wrapper = mount(JokeCard, {
      props: {
        joke: mockJoke,
        searchTerm: '',
      },
    });

    const categories = wrapper.find('.joke-card-categories');
    expect(categories.exists()).toBe(true);
    expect(categories.text()).toContain('Categories:');
    expect(categories.text()).toContain('nerdy');
  });

  it('should not display categories section when empty', () => {
    const jokeWithoutCategories = { ...mockJoke, categories: [] };
    const wrapper = mount(JokeCard, {
      props: {
        joke: jokeWithoutCategories,
        searchTerm: '',
      },
    });

    const categories = wrapper.find('.joke-card-categories');
    expect(categories.exists()).toBe(false);
  });

  it('should display formatted date', () => {
    const wrapper = mount(JokeCard, {
      props: {
        joke: mockJoke,
        searchTerm: '',
      },
    });

    const date = wrapper.find('.joke-card-footer-date');
    expect(date.exists()).toBe(true);
    expect(date.text()).toBe('01/01/2024');
  });

  it('should have correct link to joke URL', () => {
    const wrapper = mount(JokeCard, {
      props: {
        joke: mockJoke,
        searchTerm: '',
      },
    });

    const link = wrapper.find('.joke-card-footer-link');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe(mockJoke.url);
    expect(link.attributes('target')).toBe('_blank');
  });

  it('should display joke icon', () => {
    const wrapper = mount(JokeCard, {
      props: {
        joke: mockJoke,
        searchTerm: '',
      },
    });

    const icon = wrapper.find('.joke-card-footer-icon');
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('src')).toBe(mockJoke.icon_url);
    expect(icon.attributes('alt')).toBe('Chuck Norris');
  });

  it('should highlight search term in joke text', () => {
    const wrapper = mount(JokeCard, {
      props: {
        joke: mockJoke,
        searchTerm: 'Chuck',
      },
    });

    const highlightedText = wrapper.find('.highlight');
    expect(highlightedText.exists()).toBe(true);
    expect(highlightedText.text()).toBe('Chuck');
  });
});
