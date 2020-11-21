import cheerio from 'cheerio'

import { images, searchImages } from './imageScraper'
import { description } from './descriptionScraper'

export const scrape = async (url: string, keywords: string, fetcher: Function = fetch) => {
  try {
    const response = await fetcher(url)

    const html = await response.text()
    const page = cheerio.load(html, { xmlMode: true })

    return {
      title: title(page),
      description: description(page, url),
      imageUrls: await images(page, url, keywords),
      favicon: favicon(page, url),
    }
  } catch (error) {
    console.error('Failed to load metadata:' + url, error)

    return { imageUrls: await searchImages(keywords) }
  }
}

const title = page => page("meta[property='og:title']").attr('content')

const favicon = (page, url) => {
  const icon = page("link[rel='icon']").attr('href')
  // const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

  // if (!icon) return null

  // return urlRegExp.test(icon) ? icon : `${new URL(url).origin}${icon}`

  return icon
}
