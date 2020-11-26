import fetchImagesFromSearch from './imageSearchApiClient'
import fetchImagesFromUnsplash from './unsplashSearchApiClient'
import { getContent, getSrc } from './herlper'

export default class ImageScraper {
  private page: cheerio.Root
  private url: string
  private keywords: string[]

  private MAX_IMAGES = 5

  public constructor(page: cheerio.Root, url: string, keywords: string[]) {
    this.page = page
    this.url = url
    this.keywords = this.stripKeywords(keywords)
  }

  public async images(): Promise<string[]> {
    const imageUrls = this.pageImages()

    if (imageUrls.length < 3) imageUrls.push(...(await this.searchImages()))
    if (imageUrls.length < 3) imageUrls.push(...(await this.searchUnsplashImages()))

    return imageUrls
  }

  public pageImages(): string[] {
    const images = this.rules
      .map(([selector, handler]) => handler(this.page(selector)))
      .map(image => this.normalizeUrl(image))
      .filter(image => typeof image === 'string')
      .map(image => String(image))

    return images
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

  public async searchImages(): Promise<string[]> {
    try {
      const images = await fetchImagesFromSearch(this.keywords)

      return images.slice(0, this.MAX_IMAGES)
    } catch (error) {
      return []
    }
  }

  public async searchUnsplashImages(): Promise<string[]> {
    try {
      const images = await fetchImagesFromUnsplash(this.keywords)

      return images.slice(0, this.MAX_IMAGES)
    } catch (error) {
      return []
    }
  }

  private stripKeywords(keywords: string[]): string[] {
    const exludedKeywords = [
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
    return keywords
      .map(keyword => keyword.replace(/[^A-Za-z\s]/g, '').replace(/\s{2,}/g, ' '))
      .filter(keyword => keyword.length >= 4)
      .filter(keyword => !exludedKeywords.includes(keyword.toLowerCase()))
  }

  private stripFilenameFromUrl() {
    return this.url.replace(/[a-zA-Z]*\.html?$/g, '')
  }

  private rules: [string, (element: cheerio.Cheerio) => string | undefined][] = [
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
