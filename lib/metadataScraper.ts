import cheerio from 'cheerio'

export const scrape = async url => {
  const response = await fetch(url)

  const html = await response.text()

  const page = cheerio.load(html, { xmlMode: true })

  return {
    title: title(page),
    description: description(page),
    imageUrl: imageUrl(page, url),
    favicon: favicon(page, url),
  }
}

const title = page => page("meta[property='og:title']").attr('content')

const description = page => {
  const description = page("meta[property='og:description']").attr('content')

  const strippedDescription = description.replace(/(<([^>]+)>)/gi, '')

  return strippedDescription
}

const imageUrl = (page, url) => ogImageUrl(page) || firstImageUrl(page, url)

const ogImageUrl = page => {
  const ogImage = page("meta[property='og:image']").attr('content')

  if (!isImage(ogImage)) return null
}
const firstImageUrl = (page, url) => {
  const firstImageUrl = page('img').attr('src')
  const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

  if (!firstImageUrl) return null
  const firstImageFullUrl = urlRegExp.test(firstImageUrl)
    ? firstImageUrl
    : `${new URL(url).origin}/${firstImageUrl}`

  if (!isImage(firstImageFullUrl)) return null

  return firstImageFullUrl
}

const isImage = url => !/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url)

const favicon = (page, url) => {
  const icon = page("link[rel='icon']").attr('href')
  const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

  if (!icon) return null

  return urlRegExp.test(icon) ? icon : `${new URL(url).origin}${icon}`
}
