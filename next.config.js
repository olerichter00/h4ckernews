const withPWA = require('next-pwa')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  publicRuntimeConfig: {
    maxStories: process.env.NODE_ENV === 'development' ? 100 : 100,
    pageSize: 15,
    filterPageSize: 30,
    filterScoreThreshold: 100,
    filterCommentsThreshold: 100,
    loadMoreScrollOffset: 3000,
    defaultStoriesType: 'top',
    breakpoints: {
      xs: 500,
      sm: 768,
      md: 1024,
      lg: 1280,
    },
  },
  serverRuntimeConfig: {
    hackernewsBaseUrl: 'https://hacker-news.firebaseio.com/v0',
    xRapidapiHost: 'contextualwebsearch-websearch-v1.p.rapidapi.com',
    xRapidapiKey: process.env.X_RAPIDAPI_KEY,
    imageSearchBaseUrl:
      'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    unsplashBaseUrl: 'https://api.unsplash.com/search/photos',
    unsplashClientId: process.env.UNSPLASH_API_CLIENT_ID,
    cutePandaImageUrl:
      'https://www.tagesspiegel.de/images/grosser-panda-meng-meng_zoo-berlin/24195486/2-format43.jpg',
    cuteKoalaImageUrl:
      'https://www.motherjones.com/wp-content/uploads/2019/08/koala-8-20-19.jpg?resize=1536,863',
  },
  pwa: {
    dest: 'public',
  },
}

module.exports = isProduction ? withPWA(config) : config
