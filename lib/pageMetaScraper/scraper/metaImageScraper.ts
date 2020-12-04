import { getContent, getSrc, normalizeUrl } from '../utils/helper'
import cleanKeywords from '../utils/keywordCleaner'

type Strategy = [
  string,
  (element: cheerio.Root, selector: string) => string | undefined | (string | undefined)[],
]
type ServiceStrategy = [string[], (keywords: string[]) => Promise<string[]>]

export default class MetaImageScraper {
  private page: cheerio.Root
  private url: string
  private keywords: string[] = []

  private MAX_IMAGES = 10

  public constructor(page: cheerio.Root, url: string, keywords: string[]) {
    this.page = page
    this.url = url
    this.keywords = cleanKeywords(keywords)
  }

  public async images(): Promise<string[]> {
    const imageUrls = []

    try {
      imageUrls.push(...this.pageImages())
    } catch {}

    if (imageUrls.length >= 2) return imageUrls.slice(0, this.MAX_IMAGES)

    return imageUrls.slice(0, this.MAX_IMAGES)
  }

  private pageImages(): string[] {
    try {
      const images = this.strategies
        .map(([selector, handler]) => handler(this.page, selector))
        .flat()
        .map(image => normalizeUrl(this.url, image))
        .filter(image => typeof image === 'string')
        .map(image => String(image))

      return images
    } catch {}

    return []
  }

  private strategies: Strategy[] = [
    ['meta[property="og:image:secure_url"]', getContent],
    ['meta[property="og:image:url"]', getContent],
    ['meta[property="og:image"]', getContent],
    ['meta[name="twitter:image:src"]', getContent],
    ['meta[name="twitter:image"]', getContent],
    ['meta[itemprop="image"]', getContent],
    ['article img[src]', getSrc],
    ['#content img[src]', getSrc],
    ['img[alt*="author" i]', getSrc],
    ['img[src]:not([aria-hidden="true"])', getSrc],
  ]
}
