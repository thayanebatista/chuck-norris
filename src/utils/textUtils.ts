import type { TextPart } from '@/interfaces/utils/textUtils';

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightTextParts(
  text: string,
  searchTerm: string,
): TextPart[] {
  if (!searchTerm) {
    return [{ text, match: false }];
  }

  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  const parts = text.split(regex);

  return parts.map(part => ({
    text: part,
    match: part.toLowerCase() === searchTerm.toLowerCase(),
  }));
}
