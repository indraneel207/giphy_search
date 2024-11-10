import debounce from 'lodash/debounce'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useSearchApi from '../../hooks/api/SearchAPI'
import useTrendApi from '../../hooks/api/TrendAPI'
import { useMainContext } from '../../hooks/context/MainContext'
import { SearchResultType } from '../../hooks/context/MainContext.types'
import './styles.css'

function Home() {
  const navigate = useNavigate()
  const location = useLocation()

  // Local state to manage search term
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm)
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  // Get the search state from MainContext
  const { search: searchContext } = useMainContext()
  const previousSearches = searchContext.searchResults.map((result: SearchResultType) => result.key)

  // Use the debounced search term to make API requests
  const { data, loading, error } = useSearchApi(debouncedSearchTerm)
  const { data: trendingData, loading: trendingLoading, error: trendingError } = useTrendApi()

  const isLoading = loading || trendingLoading || pageLoading
  const isError = error || trendingError

  // Parse query parameter from URL on initial load
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const initialSearch = queryParams.get('q') || ''
    setSearchTerm(initialSearch)
    setDebouncedSearchTerm(initialSearch)
  }, [location.search])

  // Debounce the search term change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandler = useCallback(
    debounce((value: string) => {
      setPageLoading(false)
      setDebouncedSearchTerm(value)
      // Update the URL after debounce
      if (value.trim() !== '') {
        navigate(`/?q=${encodeURIComponent(value)}`)
      } else {
        navigate('/')
      }
    }, 1000),
    [navigate]
  )

  // UseEffect to trigger debounced search when the searchTerm changes
  useEffect(() => {
    setPageLoading(true)
    debouncedHandler(searchTerm)

    return () => {
      debouncedHandler.cancel()
    }
  }, [searchTerm, debouncedHandler])

  // Function to handle copying the URL to clipboard
  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('GIF URL copied to clipboard!')
      })
      .catch((err) => {
        toast.error('Failed to copy the URL!')
        console.error('Failed to copy: ', err)
      })
  }

  const renderGifItems = (data: any[]): JSX.Element[] =>
    data &&
    data.map((gif: any) => (
      <div key={gif.id} className='gif-item'>
        <video autoPlay loop muted>
          <source src={gif.mp4Url} type='video/mp4' />
        </video>
        <button onClick={() => handleCopyToClipboard(gif.gifUrl)} className='copy-button'>
          Copy URL 🔗
        </button>
      </div>
    ))

  const renderPreviousSearches = (): JSX.Element | null =>
    previousSearches.length > 0 ? (
      <>
        <h5 className='loading'>Previous Searches 💾</h5>
        <div className='chip-container'>
          {previousSearches.map((term: string, index: number) => (
            <div key={index} className='chip' onClick={() => setSearchTerm(term)}>
              {term}
            </div>
          ))}
        </div>
        <hr />
      </>
    ) : null

  const renderSearchResults = (): JSX.Element => {
    if (data && data.length > 0) {
      return (
        <>
          <p className='loading'>Search Results ✅</p>
          <div className='gif-container'>{renderGifItems(data)}</div>
        </>
      )
    }
    return <p className='loading'>No results found ☹️ </p>
  }

  const renderTrendingResults = (): JSX.Element => {
    if (trendingData && trendingData.length > 0) {
      return (
        <>
          <p className='loading'>Trending Gifs 🔥</p>
          <div className='gif-container'>{renderGifItems(trendingData)}</div>
        </>
      )
    }
    return <p className='loading'>No trending gifs found ☹️ </p>
  }

  const renderMainContent = (): JSX.Element => {
    if (isLoading) {
      return <p className='loading'>Loading... One moment while we train the hamsters...🐹</p>
    } else if (isError) {
      if (error?.response?.status === 429) {
        toast.error('API rate limit exceeded. Please try again later.')
      }
      return <p className='error'>Error loading search results: {error?.message}</p>
    } else {
      return searchTerm !== '' ? renderSearchResults() : renderTrendingResults()
    }
  }

  return (
    <div className='App'>
      <h1>Giphy Search</h1>
      <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for GIFs 🔎' />
      {renderPreviousSearches()}
      {renderMainContent()}
    </div>
  )
}

export default Home
