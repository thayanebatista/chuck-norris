export interface AppError {
  type: 'network' | 'server' | 'notFound' | 'unknown';
  message: string;
  statusCode?: number;
}

export const createAppError = (
  type: AppError['type'],
  message: string,
  statusCode?: number,
): AppError => ({
  type,
  message,
  statusCode,
});
