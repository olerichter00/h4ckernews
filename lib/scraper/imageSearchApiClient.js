const IMAGE_SEARCH_BASE_URL =
  'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI'

const fetchImagesFromSearch = async keywords => {
  // return [
  //   'https://www.tagesspiegel.de/images/grosser-panda-meng-meng_zoo-berlin/24195486/2-format43.jpg',
  // ]

  const params = {
    pageNumber: 1,
    pageSize: 10,
    q: keywords,
    autoCorrect: false,
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
