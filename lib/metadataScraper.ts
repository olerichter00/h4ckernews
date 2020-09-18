import cheerio from 'cheerio'

export const scrape = async url => {
  const response = await fetch(url)

  const html = await response.text()

  const page = cheerio.load(html)

  return {
    title: title(page),
    description: description(page),
    imageUrl: imageUrl(page, url),
    favicon: favicon(page, url),
  }
}

const title = page => page("meta[property='og:title']").attr('content')

const description = page => page("meta[property='og:description']").attr('content')

const imageUrl = (page, url) => {
  const ogImage = page("meta[property='og:image']").attr('content')
  const firstImageUrl = page('img').attr('src')
  const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')
  const firstImageFullUrl = urlRegExp.test(firstImageUrl)
    ? firstImageUrl
    : `${new URL(url).origin}/${firstImageUrl}`

  return ogImage || firstImageFullUrl
}

const favicon = (page, url) => {
  const icon = page("link[rel='icon']").attr('href')
  const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

  if (!icon) return null

  return urlRegExp.test(icon) ? icon : `${new URL(url).origin}${icon}`
}
