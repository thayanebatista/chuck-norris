export interface ChuckNorrisJoke {
  id: string;
  value: string;
  url: string;
  icon_url: string;
  created_at: string;
  updated_at: string;
  categories: string[];
}

export interface SearchResult {
  total: number;
  result: ChuckNorrisJoke[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  resultsCount: number;
}
