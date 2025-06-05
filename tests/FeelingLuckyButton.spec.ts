import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useChuckNorrisStore } from '@/store/chuckNorrisStore';

import FeelingLuckyButton from '@/components/FeelingLuckyButton.vue';

describe('FeelingLuckyButton', () => {
  it('should render button with correct properties and styling', () => {
    const wrapper = mount(FeelingLuckyButton);

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Feeling lucky');
    expect(button.attributes('aria-label')).toBe('Feeling lucky');

    const container = wrapper.find('.feeling-lucky-button');
    expect(container.classes()).toContain('feeling-lucky-button');

    const icon = wrapper.find('.feeling-lucky-button-icon');
    expect(icon.exists()).toBe(true);
    expect(icon.classes()).toContain('feeling-lucky-button-icon');
  });

  it('should be disabled when loading', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const store = useChuckNorrisStore();
    store.isLoading = true;

    const wrapper = mount(FeelingLuckyButton, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.vm.$nextTick();

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should call fetchRandomJoke when clicked', async () => {
    const { chuckNorrisService } = await import('@/api/chuckNorris.service');
    const mockGetRandomJoke = vi.spyOn(chuckNorrisService, 'getRandomJoke');
    mockGetRandomJoke.mockResolvedValue({
      id: '1',
      value: 'Test joke',
      url: 'http://test.com',
      icon_url: 'http://test.com/icon.png',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
      categories: [],
    });

    const wrapper = mount(FeelingLuckyButton);
    await wrapper.find('button').trigger('click');

    expect(mockGetRandomJoke).toHaveBeenCalledOnce();
  });
});
