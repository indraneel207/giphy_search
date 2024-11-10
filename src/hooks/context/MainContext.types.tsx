import { ReactNode } from "react"

export interface SearchState {
  searchResults: { [key: string]: any };
  setSearchResults: (term: string, data: any) => void;
  trendingResults: { [key: string]: any };
  setTrendingResults: (data: any) => void;
}

export interface MainContextType {
  search: SearchState
  // Additional state slices can be added here in the future.
}

export interface MainProviderProps {
  children: ReactNode
}

export interface SearchResultType {
  key: string;
  results: any;
}

export type SearchResultsType = SearchResultType[];