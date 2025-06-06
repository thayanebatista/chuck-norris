import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorMessage from '@/components/ErrorMessage.vue';

describe('ErrorMessage', () => {
  it('should not render when no message is provided', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: '',
      },
    });

    expect(wrapper.find('.error-message').exists()).toBe(false);
  });

  it('should render error message with correct attributes', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Test error message',
      },
    });

    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.attributes('role')).toBe('alert');
    expect(errorMessage.attributes('aria-live')).toBe('assertive');
  });

  it('should display error message text', () => {
    const errorText = 'Test error message';
    const wrapper = mount(ErrorMessage, {
      props: {
        message: errorText,
      },
    });

    expect(wrapper.find('.error-text').text()).toBe(errorText);
  });

  it('should render error icon', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Test error message',
      },
    });

    const icon = wrapper.find('.error-icon');
    expect(icon.exists()).toBe(true);
  });

  it('should have correct CSS classes', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: 'Test error message',
      },
    });

    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.classes()).toContain('error-message');

    const errorText = wrapper.find('.error-text');
    expect(errorText.classes()).toContain('error-text');

    const errorIcon = wrapper.find('.error-icon');
    expect(errorIcon.classes()).toContain('error-icon');
  });
});
