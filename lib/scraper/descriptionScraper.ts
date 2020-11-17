const MIN_TEXT_LENGTH = 30
const MAX_TEXT_LENGTH = 300

export const description = (page: string, url: string): string | undefined => {
  if (isAPdf(url)) return

  const description = openGraphDescription(page) || pageText(page)
  const strippedDescription =
    description && description.replace(/(<([^>]+)>)/gi, ' ').replace(/&.*;/g, ' ')

  return strippedDescription
}

const openGraphDescription = page => page("meta[property='og:description']").attr('content')

const pageText = page => firstParagraph(page) || firstPreformatedText(page)

const firstParagraph = page => page('p').first().text().slice(0, MAX_TEXT_LENGTH)

const firstPreformatedText = page => page('pre').first().text().slice(0, MAX_TEXT_LENGTH)

const isAPdf = url => url.endsWith('.pdf')
