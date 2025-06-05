import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '@/components/WesternButton.vue';

describe('Button', () => {
  it('should render button with correct props and handle disabled state', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click me',
        disabled: true,
        type: 'button',
        ariaLabel: 'Custom aria label',
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Click me');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('aria-label')).toBe('Custom aria label');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should handle click events correctly', async () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click me',
        disabled: false,
        type: 'button',
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();

    await wrapper.setProps({ disabled: true });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should render with icon slot', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click me',
        type: 'button',
        disabled: false,
      },
      slots: {
        icon: '<span class="test-icon">Icon</span>',
      },
    });

    const icon = wrapper.find('.test-icon');
    expect(icon.exists()).toBe(true);
    expect(icon.text()).toBe('Icon');
  });
});
