import { computed, type Ref } from 'vue';
import { highlightTextParts } from '@/utils/textUtils';
import type { TextPart } from '@/interfaces/utils/textUtils';

export function useTextHighlight(
  text: Ref<string> | string,
  searchTerm: Ref<string> | string
) {
  const highlightedParts = computed((): TextPart[] => {
    const textValue = typeof text === 'string' ? text : text.value;
    const searchValue = typeof searchTerm === 'string' ? searchTerm : searchTerm.value;
    
    return highlightTextParts(textValue, searchValue);
  });

  return {
    highlightedParts,
  };
} 