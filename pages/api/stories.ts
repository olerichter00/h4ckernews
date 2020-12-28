import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import { asyncTimeout } from '../../lib/utils/timeoutHelper'
import { fetchStory, fetchStoryIds } from '../../lib/apiClient'
import { createTimeoutFetch } from '../../lib/utils/timeoutHelper'
import metadataScraper from '../../lib/metadataScraper'
import { withCache } from '../../lib/cache/mongoCache'

const MAX_AGE = 60 * 60 * 24
const MAX_STORIES = 300
const TIMEOUT = 5000

export default async (req: NowRequest, res: NowResponse) => {
  process.setMaxListeners(100)

  const type = String(req.query.type || 'top')
  const page = Number(req.query.page || 0)
  const pageSize = Number(req.query.pageSize || MAX_STORIES)

  const cacheKey = `${process.env.NODE_ENV}-stories-${type}-${page}-${pageSize}`
  const maxAge = forceValidate(req) ? 0 : MAX_AGE

  const stories = await withCache(cacheKey, buildGetStories(type, page, pageSize), {
    maxAge,
    staleWhileInvalidate: true,
  })

  res.setHeader('Cache-Control', 'public, s-max-age=1, stale-while-revalidate')
  res.status(Status.OK).json({ data: stories })
}

const forceValidate = (req: NowRequest): boolean =>
  req.headers['pragma'] === 'no-cache' || req.headers['cache-control'] === 'no-cache'

const buildGetStories = (type: string, page: number, pageSize: number) => async () => {
  const storyIds = await fetchStoryIds({ type })

  const timer = asyncTimeout(TIMEOUT)

  const storyPormises = storyIds.slice(page * pageSize, (page + 1) * pageSize).map(id => {
    const cacheKey = `${process.env.NODE_ENV}-story-${id}`

    return Promise.race([withCache(cacheKey, buildGetStory(id), { maxAge: 31536000 }), timer])
  })

  const stories = await Promise.allSettled(storyPormises)

  return stories.map(story => story.status === 'fulfilled' && story.value).filter(story => story)
}

const buildGetStory = (id: string) => async () => {
  const story = await fetchStory(id, createTimeoutFetch(2000))
  const metadata = (await getMetadata(id, story.url, story.title.split(' '))) || {}

  return { ...story, ...metadata }
}

const getMetadata = async (id: string, url: string, keywords: string[]) => {
  try {
    const itemUrl = `https://news.ycombinator.com/item?id=${id}`
    const storyUrl = String(url || itemUrl)

    return await metadataScraper.scrape(storyUrl, keywords, createTimeoutFetch(TIMEOUT))
  } catch (error) {
    return {}
  }
}
