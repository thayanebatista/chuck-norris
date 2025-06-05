import { createAppError } from '../interfaces/errors';

const BASE_URL = 'https://api.chucknorris.io/jokes/';

async function request<T>(endpoint: string, method: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
    });

    if (!response.ok) {
      const statusCode = response.status;

      if (statusCode === 404) {
        throw createAppError('notFound', 'Resource not found', statusCode);
      }

      if (statusCode >= 500) {
        throw createAppError('server', 'Server error', statusCode);
      }

      throw createAppError(
        'unknown',
        `Request failed: ${statusCode}`,
        statusCode,
      );
    }

    return response.json();
  } catch (error) {
    if (error && typeof error === 'object' && 'type' in error) {
      throw error;
    }

    throw createAppError('network', 'Connection error');
  }
}

export const apiService = {
  get: <T>(endpoint: string) => request<T>(endpoint, 'GET'),
};
