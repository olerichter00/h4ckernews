import { IMAGE_SEARCH_BASE_URL, CUTE_PANDA_IMAGE_URL } from '../config'

const fetchImagesFromSearch = async keywords => {
  // Return cute panda image in development mode
  if (process.env.NODE_ENV === 'development') {
    return [CUTE_PANDA_IMAGE_URL]
  }

  const params = {
    pageNumber: 1,
    pageSize: 10,
    q: keywords,
    autoCorrect: true,
  }

  const headers = {
    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
  }

  const url = new URL(IMAGE_SEARCH_BASE_URL)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url.toString(), { headers: headers })
  const json = await response.json()

  const images = json.value.map(image => image.url)

  return images
}

export default fetchImagesFromSearch
