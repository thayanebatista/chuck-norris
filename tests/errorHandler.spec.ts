import { describe, it, expect } from 'vitest';
import { getErrorMessage } from '@/utils/errorHandler';
import { createAppError } from '@/interfaces/errors';

describe('errorHandler', () => {
  it('should return network error message', () => {
    const error = createAppError('network', 'Connection error');
    expect(getErrorMessage(error)).toBe(
      'No internet connection. Please check your connection.',
    );
  });

  it('should return server error message', () => {
    const error = createAppError('server', 'Server error', 500);
    expect(getErrorMessage(error)).toBe(
      'Service temporarily unavailable. Please try again.',
    );
  });

  it('should return not found error message', () => {
    const error = createAppError('notFound', 'Resource not found', 404);
    expect(getErrorMessage(error)).toBe(
      'No jokes found. Try different search terms.',
    );
  });

  it('should return unknown error message', () => {
    const error = createAppError('unknown', 'Unknown error', 400);
    expect(getErrorMessage(error)).toBe(
      'Something went wrong. Please try again.',
    );
  });

  it('should return default error message for non-app errors', () => {
    const error = new Error('Test error');
    expect(getErrorMessage(error)).toBe('Unexpected error. Please try again.');
  });

  it('should handle null error', () => {
    expect(getErrorMessage(null)).toBe('Unexpected error. Please try again.');
  });

  it('should handle undefined error', () => {
    expect(getErrorMessage(undefined)).toBe(
      'Unexpected error. Please try again.',
    );
  });

  it('should handle string error', () => {
    expect(getErrorMessage('Test error')).toBe(
      'Unexpected error. Please try again.',
    );
  });

  it('should handle object without type property', () => {
    const error = { message: 'Test error' };
    expect(getErrorMessage(error)).toBe('Unexpected error. Please try again.');
  });
});
