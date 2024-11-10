import { useState, useEffect, useCallback, useRef } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import URLs from '../../config/urls.json'
import { useMainContext } from '../context/MainContext'
import transformGifApiResponse from '../../utils'
import systemConfig from '../../config/systemConfig.json'

/**
 * Custom hook to perform a search API request using Axios.
 */
const useTrendApi = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const cacheRef = useRef<{ [key: string]: any }>({})

  // Get context for searchResults
  const { search } = useMainContext()
  const { trendingResults, setTrendingResults } = search

  const fetchData = useCallback(async () => {
    setError(null) // Clear any previous errors

    // If the data is already cached, use it
    if (cacheRef.current && cacheRef.current['trending']) {
      setData(cacheRef.current['trending'])
      return
    }

    // Check context and localStorage for cached results
    if (trendingResults && trendingResults.length > 0) {
      setData(trendingResults)
      return
    }

    setLoading(true)
    try {
      const response: AxiosResponse = await axios(URLs.trendingGiphys, {
        params: { api_key: process.env.REACT_APP_GIPHY_API_KEY, limit: systemConfig.api.requestLimit }
      })
      // const response = searchMockData
      const transformedResponse = transformGifApiResponse(response.data)

      setData(transformedResponse) // Update the state with the transformed response
      cacheRef.current['trending'] = transformedResponse // Cache the result for future requests
      setTrendingResults(transformedResponse) // Save to Context and localStorage

      setError(null)
    } catch (err) {
      setError(err as AxiosError)
    } finally {
      setLoading(false)
    }
  }, [setTrendingResults, trendingResults])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error }
}

export default useTrendApi
