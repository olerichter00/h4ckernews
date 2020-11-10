export const description = page => {
  const description = openGrapheDescription(page) || pageText(page)
  const strippedDescription = description && description.replace(/(<([^>]+)>)/gi, ' ')

  return strippedDescription
}

const openGrapheDescription = page => page("meta[property='og:description']").attr('content')

const pageText = page => page('p').first().text().slice(0, 100)
