import config from '../config'

type Params = {
  query: string
  [key: string]: any
}

type JsonResponse = {
  results: {
    urls: {
      small: string
    }
  }[]
}

const fetchImagesFromSearch = async (keywords: string[]): Promise<string[]> => {
  // Return cute panda image in development mode
  if (process.env.NODE_ENV === 'development') {
    return [config.cuteKoalaImageUrl]
  }

  const params: Params = {
    query: keywords.join(' '),
  }

  const headers = {
    Authorization: `Client-ID ${config.unsplashClientId}`,
  }

  const url = new URL(config.unsplashBaseUrl)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url.toString(), { headers })
  const json: JsonResponse = await response.json()

  const images = json.results.map(image => image.urls.small)

  return images
}

export default fetchImagesFromSearch
