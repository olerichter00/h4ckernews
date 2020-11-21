export const PAGE_SIZE = 15
export const FILTER_PAGE_SIZE = 40

export const MAX_STORIES = process.env.NODE_ENV === 'development' ? 30 : 100

export const FILTER_SCORE_THRESHOLD = 100
export const FILTER_COMMENTS_THRESHOLD = 100

export const LOAD_MORE_SCROLL_OFFSET = 3000

export const BREAKPOINTS = {
  xs: 500,
  sm: 768,
  md: 1024,
  lg: 1280,
}

export const PREFETCH_TIMEOUT = 0

export const DEFAULT_STORIES_TYPE = 'top'

export const HACKERNEWS_BASE_URL = 'https://hacker-news.firebaseio.com/v0'
export const IMAGE_SEARCH_BASE_URL =
  'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI'
export const UNSPLASH_BASE_URL = 'https://api.unsplash.com/search/photos'
export const CUTE_PANDA_IMAGE_URL =
  'https://www.tagesspiegel.de/images/grosser-panda-meng-meng_zoo-berlin/24195486/2-format43.jpg'
