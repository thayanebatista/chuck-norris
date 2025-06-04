import type { AppError } from '../interfaces/errors';

export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'type' in error) {
    const appError = error as AppError;

    switch (appError.type) {
      case 'network':
        return 'No internet connection. Please check your connection.';
      case 'server':
        return 'Service temporarily unavailable. Please try again.';
      case 'notFound':
        return 'No jokes found. Try different search terms.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  return 'Unexpected error. Please try again.';
};