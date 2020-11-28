import fetchImagesFromSearch from './imageSearchApiClient'
import fetchImagesFromUnsplash from './unsplashSearchApiClient'
import { getContent, getSrc } from './helper'

const EXCLUDE_KEYWORDS = [
  'ask',
  'show',
  'hn',
  'the',
  'a',
  'that',
  'this',
  'as',
  'and',
  'or',
  'for',
  'in',
  'out',
  'new',
  'i',
]

type ServiceStrategy = [string[], (keywords: string[]) => Promise<string[]>]
type PageStrategy = [string, (element: cheerio.Cheerio) => string | undefined]
export default class ImageScraper {
  private page: cheerio.Root
  private url: string
  private keywords: string[] = []

  private MAX_IMAGES = 5

  public constructor(page: cheerio.Root, url: string, keywords: string[]) {
    this.page = page
    this.url = url
    this.keywords = this.stripKeywords(keywords)
  }

  public async images(): Promise<string[]> {
    const imageUrls = this.callPageStrategies(this.metaStrategies)

    if (imageUrls.length <= 0) {
      imageUrls.push(...this.callPageStrategies(this.pageStrategies))
      imageUrls.push(...(await this.callFallbackStrategies(this.fallbackStrategies)))
    } else {
      imageUrls.push(...(await this.callFallbackStrategies(this.supplementFallbackStrategies)))
    }

    return imageUrls
  }

  public async fallbackImages(strategies: PageStrategy[]): Promise<string[]> {
    return [
      ...(await this.callFallbackStrategies(this.fallbackStrategies)),
      ...(await this.callFallbackStrategies(this.supplementFallbackStrategies)),
    ]
  }

  private callPageStrategies(strategies: PageStrategy[]): string[] {
    try {
      const images = strategies
        .map(([selector, handler]) => handler(this.page(selector)))
        .map(image => this.normalizeUrl(image))
        .filter(image => typeof image === 'string')
        .map(image => String(image))

      return images
    } catch {}

    return []
  }

  private async callFallbackStrategies(strategies: ServiceStrategy[]): Promise<string[]> {
    for (const [keywords, handler] of strategies) {
      try {
        const imageUrls = await handler(keywords)

        if (imageUrls.length >= 1) return imageUrls.slice(0, this.MAX_IMAGES)
      } catch (error) {
        console.log('Fallback strategy failed.')
      }
    }

    return []
  }

  private normalizeUrl(imageUrl: string | undefined): string | undefined {
    const urlRegExp = new RegExp('^(?:[a-z]+:)?//', 'i')

    if (!imageUrl) return

    const isFullPath = urlRegExp.test(imageUrl)
    const isAbsolutePath = /^\//i.test(imageUrl)

    if (isFullPath) return imageUrl

    if (isAbsolutePath) return `${new URL(this.url).origin}${imageUrl}`

    const pureUrl = this.stripFilenameFromUrl()

    return `${pureUrl}/${imageUrl}`
  }

  private stripKeywords(keywords: string[]): string[] {
    return keywords
      .map(keyword => keyword.replace(/[^A-Za-z\s]/g, '').replace(/\s{2,}/g, ' '))
      .filter(keyword => keyword.length >= 4)
      .filter(keyword => !EXCLUDE_KEYWORDS.includes(keyword.toLowerCase()))
  }

  private stripFilenameFromUrl() {
    return this.url.replace(/[a-zA-Z]*\.html?$/g, '')
  }

  private fallbackStrategies: ServiceStrategy[] = [[this.keywords, fetchImagesFromSearch]]

  private supplementFallbackStrategies: ServiceStrategy[] = [
    [this.keywords, fetchImagesFromUnsplash],
  ]

  private pageStrategies: PageStrategy[] = [
    ['article img[src]', getSrc],
    ['#content img[src]', getSrc],
    ['img[alt*="author" i]', getSrc],
    ['img[src]:not([aria-hidden="true"])', getSrc],
  ]

  private metaStrategies: PageStrategy[] = [
    ['meta[property="og:image:secure_url"]', getContent],
    ['meta[property="og:image:url"]', getContent],
    ['meta[property="og:image"]', getContent],
    ['meta[name="twitter:image:src"]', getContent],
    ['meta[name="twitter:image"]', getContent],
    ['meta[itemprop="image"]', getContent],
  ]
}
