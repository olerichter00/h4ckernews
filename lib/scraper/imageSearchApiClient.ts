import config from '../config'

const fetchImagesFromSearch = async keywords => {
  // Return cute panda image in development mode
  if (process.env.NODE_ENV === 'development') {
    return [config.cutePandaImageUrl]
  }

  const params = {
    pageNumber: 1,
    pageSize: 10,
    q: keywords,
    autoCorrect: true,
  }

  const headers = {
    'x-rapidapi-key': config.xRapidapiKey,
    'x-rapidapi-host': config.xRapidapiKey,
  }

  const url = new URL(config.imageSearchBaseUrl)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url.toString(), { headers: headers })
  const json = await response.json()

  const images = json.value.map(image => image.url)

  return images
}

export default fetchImagesFromSearch
