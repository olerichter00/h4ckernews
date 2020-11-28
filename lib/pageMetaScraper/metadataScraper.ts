import cheerio from 'cheerio'

import ImageScraper from './imageScraper'
import DescriptionScraper from './descriptionScraper'
import TitleScraper from './titleScraper'
import FaviconScraper from './faviconScraper'

type Metadata = {
  title?: string
  description?: string
  imageUrls?: string[]
  favicon?: string
}

export default async (url: string, keywords: string[], fetcher: Function = fetch) => {
  const metadataScraper = new MetadataScraper(url, keywords, fetcher)

  await metadataScraper.loadPage()

  return await metadataScraper.scrape()
}

export class MetadataScraper {
  private url: string
  private keywords: string[]
  private fetcher: Function
  private page: any

  public constructor(url: string, keywords: string[], fetcher: Function = fetch) {
    this.url = url
    this.keywords = keywords
    this.fetcher = fetcher
  }

  public async loadPage() {
    try {
      const response = await this.fetcher(this.url)
      const html = await response.text()
      this.page = cheerio.load(html, {
        xmlMode: true,
        normalizeWhitespace: true,
        decodeEntities: true,
      })
    } catch (error) {
      console.error('Failed to load page.', error)
    }
  }

  public async scrape(): Promise<Metadata> {
    const metadata: Metadata = {}

    try {
      metadata.title = this.title()
      metadata.description = this.description()
      metadata.favicon = this.favicon()
    } catch (error) {
      console.error('Failed to load metadata: ' + this.url, error)
    }

    metadata.imageUrls = await this.images()

    return metadata
  }

  private async images() {
    return await new ImageScraper(this.page, this.url, this.keywords).images()
  }

  private title(): string | undefined {
    return new TitleScraper(this.page).title()
  }

  private favicon(): string | undefined {
    return new FaviconScraper(this.page).favicon()
  }

  private description(): string | undefined {
    return new DescriptionScraper(this.page, this.url, 300).description()
  }
}
