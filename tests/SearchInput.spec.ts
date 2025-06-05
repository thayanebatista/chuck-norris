import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

import SearchInput from '@/components/SearchInput.vue';

describe('SearchInput', () => {
  it('should render search input with correct attributes', () => {
    const wrapper = mount(SearchInput);

    const input = wrapper.get('input[type="text"]');
    expect(input.attributes('placeholder')).toBe('Search for a joke');
    expect(input.attributes('id')).toBe('search-input');
    expect(input.attributes('aria-label')).toBe(
      'Search for Chuck Norris jokes',
    );
  });

  it('should show clear button when input has text', async () => {
    const wrapper = mount(SearchInput);
    const input = wrapper.get('input[type="text"]');

    await input.setValue('test');
    const clearButton = wrapper.get('button[aria-label="Clear search"]');
    expect(clearButton).toBeTruthy();
  });

  it('should hide clear button when input is empty', async () => {
    const wrapper = mount(SearchInput);
    const input = wrapper.get('input[type="text"]');

    await input.setValue('test');
    await input.setValue('');
    expect(wrapper.find('button[aria-label="Clear search"]').exists()).toBe(
      false,
    );
  });

  it('should clear input when clear button is clicked', async () => {
    const wrapper = mount(SearchInput);
    const input = wrapper.get('input[type="text"]');

    await input.setValue('test');
    await wrapper.get('button[aria-label="Clear search"]').trigger('click');

    await new Promise(resolve => setTimeout(resolve, 600));
    await wrapper.vm.$nextTick();

    expect((input.element as HTMLInputElement).value).toBe('');
  });

  it('should show history dropdown when input is focused', async () => {
    const wrapper = mount(SearchInput);
    const store = useChuckNorrisStore();

    store.addToSearchHistory('test', 1);

    await wrapper.vm.$nextTick();
    const input = wrapper.get('input[type="text"]');

    await input.trigger('focus');
    await wrapper.vm.$nextTick();

    const historyList = wrapper.get('ul[aria-label="Search history"]');
    expect(historyList).toBeTruthy();
  });

  it('should hide history dropdown when input is blurred', async () => {
    const wrapper = mount(SearchInput);
    const store = useChuckNorrisStore();

    store.addToSearchHistory('test', 1);

    await wrapper.vm.$nextTick();
    const input = wrapper.get('input[type="text"]');

    await input.trigger('focus');
    await wrapper.vm.$nextTick();
    await input.trigger('blur');

    await new Promise(resolve => setTimeout(resolve, 200));
    expect(wrapper.find('ul[aria-label="Search history"]').exists()).toBe(
      false,
    );
  });

  it('should select history item when clicked', async () => {
    const wrapper = mount(SearchInput);
    const store = useChuckNorrisStore();

    store.addToSearchHistory('test', 1);

    await wrapper.vm.$nextTick();
    const input = wrapper.get('input[type="text"]');

    await input.trigger('focus');
    await wrapper.vm.$nextTick();

    const historyItem = wrapper.get('.history-item');
    await historyItem.trigger('click');

    expect((input.element as HTMLInputElement).value).toBe('test');
  });

  it('should remove history item when remove button is clicked', async () => {
    const wrapper = mount(SearchInput);
    const store = useChuckNorrisStore();

    store.addToSearchHistory('test', 1);

    await wrapper.vm.$nextTick();
    const input = wrapper.get('input[type="text"]');

    await input.trigger('focus');
    await wrapper.vm.$nextTick();

    const removeButton = wrapper.get(
      'button[aria-label="Remove from history"]',
    );
    await removeButton.trigger('click');

    expect(store.searchHistory).toHaveLength(0);
  });

  it('should clear history when clear history button is clicked', async () => {
    const wrapper = mount(SearchInput);
    const store = useChuckNorrisStore();

    store.addToSearchHistory('test1', 1);
    store.addToSearchHistory('test2', 1);

    await wrapper.vm.$nextTick();
    const input = wrapper.get('input[type="text"]');

    await input.trigger('focus');
    await wrapper.vm.$nextTick();

    const clearButton = wrapper.get('button[aria-label="Clear history"]');
    await clearButton.trigger('click');

    expect(store.searchHistory).toHaveLength(0);
  });

  it('should be disabled when loading', async () => {
    const wrapper = mount(SearchInput);
    const store = useChuckNorrisStore();

    store.isLoading = true;
    await wrapper.vm.$nextTick();

    const input = wrapper.get('input[type="text"]');
    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  it('should have correct CSS classes', () => {
    const wrapper = mount(SearchInput);

    const container = wrapper.get('.search-input');
    expect(container.classes()).toContain('search-input');

    const input = wrapper.get('input[type="text"]');
    expect(input.classes()).toContain('input');
  });

  it('should be accessible', async () => {
    const wrapper = mount(SearchInput);

    const input = wrapper.get('input[type="text"]');
    expect(input.attributes('id')).toBe('search-input');
    expect(input.attributes('aria-label')).toBe(
      'Search for Chuck Norris jokes',
    );

    await input.setValue('test');
    await wrapper.vm.$nextTick();

    const clearButton = wrapper.find('button[aria-label="Clear search"]');
    if (clearButton.exists()) {
      expect(clearButton.attributes('aria-label')).toBe('Clear search');
    }
  });
});
