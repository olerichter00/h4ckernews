import { getContent, getText } from './helper'

export default class TitleScraper {
  private page: any

  public constructor(page: string) {
    this.page = page
  }

  public title(): string | undefined {
    const title = this.rules
      .map(([selector, handler]) => handler(this.page(selector)))
      .filter(title => title)
      .map(title => String(title))

    return title[0]
  }

  private rules: [string, (element: cheerio.Cheerio) => string | undefined][] = [
    ["meta[property='og:title']", getContent],
    ['title', getText],
  ]
}
