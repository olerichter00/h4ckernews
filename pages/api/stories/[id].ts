import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import { fetchStory } from '../../../lib/apiClient'
import { createTimeoutFetch } from '../../../lib/utils/timeoutFetch'
import metadataScraper from '../../../lib/metadataScraper'
import { withCache } from '../../../lib/cache/mongoCache'

export default async (req: NowRequest, res: NowResponse) => {
  const id = req.query.id.toString()

  const cacheKey = `${process.env.NODE_ENV}-story-${id}`

  const story = await withCache(cacheKey, buildGetStory(id), { maxAge: 86400 })

  res.setHeader('Cache-Control', 's-maxage=86400')
  res.json(story)
}

const buildGetStory = (id: string) => async () => {
  const story = await fetchStory(id)

  let metadata = await getMetadata(id, story.url, story.title)

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
