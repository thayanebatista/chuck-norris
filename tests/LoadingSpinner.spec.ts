import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

describe('LoadingSpinner', () => {
  it('should be accessible', () => {
    const wrapper = mount(LoadingSpinner);

    const container = wrapper.find('.loading-spinner');
    expect(container.attributes('role')).toBe('status');
    expect(container.attributes('aria-label')).toBe('Loading');

    const srText = wrapper.find('.sr-only');
    expect(srText.exists()).toBe(true);
    expect(srText.text()).toBe('Loading...');
  });

  it('should render spinner element', () => {
    const wrapper = mount(LoadingSpinner);
    const spinner = wrapper.find('.spinner');
    expect(spinner.exists()).toBe(true);
  });
});
