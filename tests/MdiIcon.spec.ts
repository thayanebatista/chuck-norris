import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MdiIcon from '@/components/MdiIcon.vue';

describe('MdiIcon', () => {
  it('should render icon with correct attributes', () => {
    const wrapper = mount(MdiIcon, {
      props: {
        name: 'close',
        size: 24,
        color: 'currentColor',
      },
    });

    const svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.attributes('width')).toBe('24');
    expect(svg.attributes('height')).toBe('24');
    expect(svg.attributes('fill')).toBe('currentColor');
    expect(svg.attributes('role')).toBe('img');
    expect(svg.attributes('aria-hidden')).toBe('true');
  });

  it('should handle custom size and color', () => {
    const wrapper = mount(MdiIcon, {
      props: {
        name: 'close',
        size: 32,
        color: '#FF0000',
      },
    });

    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('32');
    expect(svg.attributes('height')).toBe('32');
    expect(svg.attributes('fill')).toBe('#FF0000');
  });

  it('should handle non-existent icon gracefully', () => {
    const wrapper = mount(MdiIcon, {
      props: {
        name: 'NonExistentIcon',
      },
    });

    const path = wrapper.find('path');
    expect(path.exists()).toBe(true);
    expect(path.attributes('d')).toBe('');
  });
});
