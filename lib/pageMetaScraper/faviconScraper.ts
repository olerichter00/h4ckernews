import { getHref } from './herlper'

export default class FaviconScraper {
  private page: any

  public constructor(page: string) {
    this.page = page
  }

  public favicon(): string | undefined {
    const favicons = this.rules
      .map(([selector, handler]) => handler(this.page(selector)))
      .filter(favicons => favicons)
      .map(favicons => String(favicons))

    return favicons[0]
  }

  private rules: [string, (element: cheerio.Cheerio) => string | undefined][] = [
    ["link[rel='icon']", getHref],
  ]
}
