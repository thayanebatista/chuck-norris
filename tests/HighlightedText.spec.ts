import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HighlightedText from '@/components/HighlightedText.vue';

describe('HighlightedText', () => {
  it('should render text without highlights when no search term', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Hello World',
        searchTerm: '',
      },
    });

    expect(wrapper.text()).toBe('Hello World');
    expect(wrapper.find('.highlight').exists()).toBe(false);
  });

  it('should highlight matching text', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Hello World',
        searchTerm: 'World',
      },
    });

    const highlighted = wrapper.find('.highlight');
    expect(highlighted.exists()).toBe(true);
    expect(highlighted.text()).toBe('World');
  });

  it('should highlight multiple matches', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Hello World, Hello Universe',
        searchTerm: 'Hello',
      },
    });

    const highlights = wrapper.findAll('.highlight');
    expect(highlights).toHaveLength(2);
    highlights.forEach(highlight => {
      expect(highlight.text()).toBe('Hello');
    });
  });

  it('should be case insensitive', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Hello World',
        searchTerm: 'world',
      },
    });

    const highlighted = wrapper.find('.highlight');
    expect(highlighted.exists()).toBe(true);
    expect(highlighted.text()).toBe('World');
  });

  it('should handle special characters in search term', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Hello (World)',
        searchTerm: '(World)',
      },
    });

    const highlighted = wrapper.find('.highlight');
    expect(highlighted.exists()).toBe(true);
    expect(highlighted.text()).toBe('(World)');
  });

  it('should handle empty text', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: '',
        searchTerm: 'test',
      },
    });

    expect(wrapper.text()).toBe('');
    expect(wrapper.find('.highlight').exists()).toBe(false);
  });

  it('should handle custom highlight class', () => {
    const wrapper = mount(HighlightedText, {
      props: {
        text: 'Hello World',
        searchTerm: 'World',
        highlightClass: 'custom-highlight',
      },
    });

    const highlighted = wrapper.find('.custom-highlight');
    expect(highlighted.exists()).toBe(true);
    expect(highlighted.text()).toBe('World');
  });
});
