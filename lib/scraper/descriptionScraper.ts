const MAX_TEXT_LENGTH = 300

export const description = page => {
  const description = openGrapheDescription(page) || pageText(page)
  const strippedDescription =
    description && description.replace(/(<([^>]+)>)/gi, ' ').replace(/&.*;/g, ' ')

  return strippedDescription
}

const openGrapheDescription = page => page("meta[property='og:description']").attr('content')

const pageText = page => page('p').first().text().slice(0, MAX_TEXT_LENGTH)
