import { UNSPLASH_BASE_URL, CUTE_PANDA_IMAGE_URL } from '../config'

const fetchImagesFromSearch = async keywords => {
  // Return cute panda image in development mode
  if (process.env.NODE_ENV === 'development') {
    return [CUTE_PANDA_IMAGE_URL]
  }

  const params = {
    query: keywords,
  }

  const headers = {
    Authorization: 'Client-ID yZZXOi-K15C658rp6BwPZtb-sg83vVhKk55yKj5u5Iw',
  }

  const url = new URL(UNSPLASH_BASE_URL)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url.toString(), { headers })
  const json = await response.json()

  const images = json.results.map(image => image.urls.small)

  return images
}

export default fetchImagesFromSearch
