import cheerio from 'cheerio'

import { images } from './imageScraper'
import { description } from './descriptionScraper'

export const scrape = async (url, keywords) => {
  const response = await fetch(url)
  const html = await response.text()
  const page = cheerio.load(html, { xmlMode: true })

  return {
    title: title(page),
    description: description(page),
    imageUrls: await images(page, url, keywords),
    favicon: favicon(page, url),
  }
}

const title = page => page("meta[property='og:title']").attr('content')

const favicon = (page, url) => {
  const icon = page("link[rel='icon']").attr('href')
  const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

  if (!icon) return null

  return urlRegExp.test(icon) ? icon : `${new URL(url).origin}${icon}`
}
