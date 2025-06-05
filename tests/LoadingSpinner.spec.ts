import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

describe('LoadingSpinner', () => {
  beforeEach(() => {
    if (!document.body) {
      document.body = document.createElement('body');
    }
  });

  it('should be accessible when visible', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { visible: true },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const container = wrapper.find('.loading-overlay');
    expect(container.exists()).toBe(true);
    expect(container.attributes('role')).toBe('status');
    expect(container.attributes('aria-label')).toBe('Loading');
  });

  it('should render spinner element when visible', async () => {
    const wrapper = mount(LoadingSpinner, {
      props: { visible: true },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    const spinner = wrapper.find('.spinner');
    expect(spinner.exists()).toBe(true);
  });

  it('should not render when not visible', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { visible: false },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const container = wrapper.find('.loading-overlay');
    expect(container.exists()).toBe(false);
  });

  it('should have correct spinner styles', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { visible: true },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const spinner = wrapper.find('.spinner');
    expect(spinner.exists()).toBe(true);
    expect(spinner.classes()).toContain('spinner');
  });
});
