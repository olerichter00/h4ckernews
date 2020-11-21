import config from '../config'

const fetchImagesFromSearch = async keywords => {
  // Return cute panda image in development mode
  if (process.env.NODE_ENV === 'development') {
    return [config.cutePandaImageUrl]
  }

  const params = {
    query: keywords,
  }

  const headers = {
    Authorization: `Client-ID ${config.unsplashClientId}`,
  }

  const url = new URL(config.unsplashBaseUrl)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url.toString(), { headers })
  const json = await response.json()

  const images = json.results.map(image => image.urls.small)

  return images
}

export default fetchImagesFromSearch
