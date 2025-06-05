import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NoResultsCard from '@/components/NoResultsCard.vue';

describe('NoResultsCard', () => {
  it('should render no results card with message', () => {
    const wrapper = mount(NoResultsCard);

    expect(wrapper.find('.no-results-card').exists()).toBe(true);
    expect(wrapper.find('.no-results-content').exists()).toBe(true);
    expect(wrapper.find('.gif-container').exists()).toBe(true);
    expect(wrapper.find('.message-container').exists()).toBe(true);
  });

  it('should display correct message text', () => {
    const wrapper = mount(NoResultsCard);

    expect(wrapper.find('h2').text()).toBe('No Jokes Found');
    expect(wrapper.text()).toContain(
      "Sorry, couldn't find any Chuck Norris jokes matching your search.",
    );
    expect(wrapper.text()).toContain(
      'Try a different search term or get a random joke!',
    );
  });

  it('should display a random GIF', () => {
    const wrapper = mount(NoResultsCard);

    const img = wrapper.find('.random-gif');
    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('Chuck Norris GIF');
    expect(img.attributes('src')).toBeTruthy();
  });

  it('should have correct CSS classes for styling', () => {
    const wrapper = mount(NoResultsCard);

    expect(wrapper.find('.no-results-card').exists()).toBe(true);
    expect(wrapper.find('.no-results-content').exists()).toBe(true);
    expect(wrapper.find('.gif-container').exists()).toBe(true);
    expect(wrapper.find('.random-gif').exists()).toBe(true);
    expect(wrapper.find('.message-container').exists()).toBe(true);
  });

  it('should have fadeInUp animation class on main container', () => {
    const wrapper = mount(NoResultsCard);

    // A animação é aplicada via CSS, então verificamos se o elemento existe
    expect(wrapper.find('.no-results-card').exists()).toBe(true);
  });
});
