interface Gif {
  id: string;
  title: string;
  gifUrl: string;
  mp4Url: string;
}

interface GiphyApiResponse {
  data: any[];
}

/**
 * Transformer function to clean up the Giphy API response
 * and extract only the relevant fields for each GIF, including the mp4 URL.
 *
 * @param response - The raw response from the Giphy API
 * @returns An array of simplified GIF objects with mp4 URLs
 */
export const transformGifApiResponse = (responseData: GiphyApiResponse): Gif[] => {

  return responseData.data.map((gif) => {
    const { id, title, images } = gif;

    // Extract the URL of the original GIF or fallback to downsized version
    const gifUrl = images?.original?.url || images?.downsized?.url || '';

    // Extract the mp4 URL, fallback to an empty string if not available
    const mp4Url = images?.original?.mp4 || images?.downsized_medium?.mp4 || '';

    // Return only the relevant fields
    return {
      id,
      title,
      gifUrl,
      mp4Url,
    };
  });
};

export default transformGifApiResponse;
