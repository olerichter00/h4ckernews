import fetchImagesFromSearch from './imageSearchApiClient'

const MAX_IMAGES = 5

export const images = async (page, url, keywords) =>
  openGraphImages(page) || fallbackImages(page, url, keywords)

const fallbackImages = async (page, url, keywords) => {
  return [...pageImages(page, url), ...(await searchImages(keywords))].filter(image => image)
}

const openGraphImages = page => {
  try {
    const openGraphImage = page("meta[property='og:image']").attr('content')

    if (!isImage(openGraphImage)) return

    return [openGraphImage]
  } catch (error) {
    console.log(error)
  }
}

const searchImages = async keywords => {
  try {
    const strippedKeywords = stripKeywords(keywords)
    const images = await fetchImagesFromSearch(strippedKeywords)

    return images.slice(0, MAX_IMAGES)
  } catch (error) {
    console.log(error)

    return []
  }
}

const stripKeywords = keywords =>
  keywords
    .split(',')
    .filter(keyword => !/[^a-zA-Z\- ]/i.test(keyword))
    .filter(keyword => keyword !== '')
    .filter(keyword => keyword.length >= 3)
    .join(' ')

const pageImages = (page, url) => {
  try {
    const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

    const pageImages = page('img')
      .map((_i, element) => {
        const imageUrl = page(element).attr('src')

        const isFullPath = urlRegExp.test(imageUrl)
        const isAbsolutePath = /^\//i.test(imageUrl)

        if (isFullPath) return imageUrl

        if (isAbsolutePath) return `${new URL(url).origin}${imageUrl}`

        const pureUrl = stripFilenameFromUrl(url)

        return `${pureUrl}/${imageUrl}`
      })
      .get()
      .filter(image => isImage(image))
      .slice(0, MAX_IMAGES)

    return pageImages
  } catch (error) {
    console.log(error)

    return []
  }
}

const stripFilenameFromUrl = url => url.replace(/[a-zA-Z]*\.html?$/g, '')

const isImage = url => {
  if (!url) return

  try {
    const parsedUrl = new URL(url)

    const urlWithoutQuery = parsedUrl.origin + parsedUrl.pathname

    // return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(urlWithoutQuery)
    return /\.(jpe?g|png)$/i.test(urlWithoutQuery)
  } catch {}
}

export default images
