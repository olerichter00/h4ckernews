import pageMetaScraper from 'page-meta-scraper'
import config from './config'

const isDevEnvironment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

pageMetaScraper.configure({
  useFallbackImages: false,
  imageFallbackStrategies: ['contextualweb', 'unsplash'],

  unsplashBaseUrl: config.unsplashBaseUrl,
  unsplashClientId: config.unsplashClientId,
  xRapidapiHost: config.xRapidapiHost,
  xRapidapiKey: config.xRapidapiKey,
  debugMode: isDevEnvironment ? true : false,
})

export default pageMetaScraper
