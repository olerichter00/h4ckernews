import { injectable } from 'inversify'
import pageMetaScraper from 'page-meta-scraper'
import config from '../config'

@injectable()
class MetadataService {
  constructor() {
    this.configure()
  }

  public scrape = (storyUrl: string, keywords: string[]) => {
    return pageMetaScraper.scrape(storyUrl, keywords)
  }

  public getFallbackImage = (keywords: string[]): Promise<string[]> => {
    return pageMetaScraper.fallbackImages(keywords)
  }

  private configure = () => {
    pageMetaScraper.configure({
      useFallbackImages: false,
      imageFallbackStrategies: ['contextualweb', 'unsplash'],

      unsplashBaseUrl: config.unsplashBaseUrl,
      unsplashClientId: config.unsplashClientId,
      xRapidapiHost: config.xRapidapiHost,
      xRapidapiKey: config.xRapidapiKey,
      debugMode: this.isDevEnvironment ? true : false,
    })
  }

  private isDevEnvironment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

export default MetadataService
