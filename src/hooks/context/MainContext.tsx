import { createContext, useContext, useEffect, useState } from 'react'
import { MainContextType, MainProviderProps, SearchResultsType, SearchState } from './MainContext.types'

const MainContext = createContext<MainContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = 'mainContextState'
const LEN_OF_STORED_SEARCHES = 10

export const MainProvider = ({ children }: MainProviderProps) => {
  // Load state from localStorage if available
  const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (serializedState === null) {
        return { searchResults: [], trendingResults: [] } // Default state if nothing is saved
      }
      return JSON.parse(serializedState)
    } catch (err) {
      console.error('Error loading state from localStorage:', err)
      return { searchResults: [], trendingResults: [] }
    }
  }

  // Initial state loading
  const initialState = loadStateFromLocalStorage()

  // Set up state for search results, trending results
  const [searchResults, setSearchResultsState] = useState<SearchResultsType>(initialState.searchResults || [])
  const [trendingResults, setTrendingResultsState] = useState<{ [key: string]: any }>(initialState.trendingResults || [])

  // Function to set search results
  const setSearchResults = (term: string, data: any) => {
    setSearchResultsState((prev) => [{ key: term, results: data }, ...prev].slice(0, LEN_OF_STORED_SEARCHES))
  }

  // Function to set search results
  const setTrendingResults = (data: any) => {
    setTrendingResultsState(data)
  }

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const saveStateToLocalStorage = () => {
      try {
        const serializedState = JSON.stringify({
          searchResults,
          trendingResults
        })
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState)
      } catch (err) {
        console.error('Error saving state to localStorage:', err)
      }
    }

    saveStateToLocalStorage()
  }, [searchResults, trendingResults])

  // Construct the search part of the context state
  const searchState: SearchState = {
    searchResults,
    setSearchResults,
    trendingResults,
    setTrendingResults
  }

  return <MainContext.Provider value={{ search: searchState }}>{children}</MainContext.Provider>
}

// Custom hook to use the MainContext
export const useMainContext = () => {
  const context = useContext(MainContext)
  if (context === undefined) {
    throw new Error('useMainContext must be used within a MainProvider')
  }
  return context
}
