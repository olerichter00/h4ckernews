import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import { fetchStory, fetchStoryIds } from '../../lib/apiClient'
import { createTimeoutFetch } from '../../lib/utils/timeoutFetch'
import metadataScraper from '../../lib/metadataScraper'
import { withCache } from '../../lib/cache/mongoCache'

const MAX_AGE = 600
const MAX_STORIES = 300

export default async (req: NowRequest, res: NowResponse) => {
  process.setMaxListeners(100)

  const type = String(req.query.type || 'top')
  const cacheKey = `${process.env.NODE_ENV}-stories-${type}`
  const maxAge = forceValidate(req) ? 0 : MAX_AGE

  const stories = await withCache(cacheKey, buildGetStories(type), {
    maxAge,
    staleWhileInvalidate: true,
  })

  res.setHeader('Cache-Control', 'public, s-max-age=1, stale-while-revalidate')
  res.status(Status.OK).json({ data: stories })
}

const forceValidate = (req: NowRequest): boolean =>
  req.headers['pragma'] === 'no-cache' || req.headers['cache-control'] === 'no-cache'

const buildGetStories = (type: string) => async () => {
  const storyIds = await fetchStoryIds({ type })

  const stories = await Promise.allSettled(
    storyIds.slice(0, MAX_STORIES).map(id => {
      const cacheKey = `${process.env.NODE_ENV}-story-${id}`

      return withCache(cacheKey, buildGetStory(id), { maxAge: 31536000 })
    }),
  )

  return stories.map(story => story.status === 'fulfilled' && story.value).filter(story => story)
}

const buildGetStory = (id: string) => async () => {
  const story = await fetchStory(id)
  const metadata = (await getMetadata(id, story.url, story.title)) || {}

  return { ...story, ...metadata }
}

const getMetadata = async (id: string, url: string, title: string) => {
  try {
    const itemUrl = `https://news.ycombinator.com/item?id=${id}`
    const storyUrl = String(url || itemUrl)

    const keywords = title.split(' ')

    return await metadataScraper.scrape(storyUrl, keywords, createTimeoutFetch(2000))
  } catch (error) {
    return {}
  }
}
