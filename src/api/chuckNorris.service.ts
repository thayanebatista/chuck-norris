import { apiService } from './api.service';
import type {
  ChuckNorrisJoke,
  SearchResult,
} from '../interfaces/store/chuckNorrisStore';

export const chuckNorrisService = {
  getRandomJoke: () => apiService.get<ChuckNorrisJoke>('random'),
  search: (query: string) =>
    apiService.get<SearchResult>(`search?query=${query}`),
};
