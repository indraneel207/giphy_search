import { useState, useEffect, useCallback, useRef } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import URLs from '../../config/urls.json'
import { useMainContext } from '../context/MainContext'
import transformGifApiResponse from '../../utils'
import systemConfig from '../../config/systemConfig.json'
import { SearchResultType } from '../context/MainContext.types'

/**
 * Custom hook to perform a search API request using Axios.
 */
const useSearchApi = (searchText = '') => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const cacheRef = useRef<{ [key: string]: any }>({})

  // Get context for searchResults
  const { search } = useMainContext()
  const { searchResults, setSearchResults } = search

  const fetchData = useCallback(async () => {
    // Prevent API call if the search text is empty
    if (searchText.trim() === '') {
      setData(null)
      setLoading(false)
      setError(null)
      return
    }

    // If the data is already cached, use it
    if (cacheRef.current[searchText]) {
      setData(cacheRef.current[searchText])
      return
    }

    // Check context and localStorage for cached results
    const previousCache: SearchResultType = searchResults.find((result: SearchResultType) => result.key === searchText)
    if (previousCache) {
      setData(previousCache.results)
      return
    }

    setLoading(true)
    try {
      const response: AxiosResponse = await axios(URLs.searchForGiphy, {
        params: { api_key: process.env.REACT_APP_GIPHY_API_KEY, q: searchText, limit: systemConfig.api.requestLimit }
      })
      // const response = searchMockData
      const transformedResponse = transformGifApiResponse(response.data)
      
      setData(transformedResponse)
      cacheRef.current[searchText] = transformedResponse // Cache the result for future requests
      setSearchResults(searchText, transformedResponse) // Save to Context and localStorage
      
      setError(null)
    } catch (err) {
      setError(err as AxiosError)
    } finally {
      setLoading(false)
    }
  }, [searchText, setSearchResults, searchResults])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error }
}

export default useSearchApi
