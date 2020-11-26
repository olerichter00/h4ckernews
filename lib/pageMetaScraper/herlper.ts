const MAX_TEXT_LENGTH = 300

export const getContent = (element: cheerio.Cheerio) => element.attr('content')
export const getSrc = (element: cheerio.Cheerio) => element.attr('src')

export const getText = (element: cheerio.Cheerio) => element.text()

export const getHref = (element: cheerio.Cheerio) => element.attr('href')
