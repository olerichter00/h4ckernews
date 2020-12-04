import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import { fetchStory } from '../../../lib/apiClient'
import { createTimeoutFetch } from '../../../lib/utils/timeoutFetch'
import metadataScraper from '../../../lib/pageMetaScraper/pageMetaScraper'

export default async (req: NowRequest, res: NowResponse) => {
  const id = req.query.id.toString()

  const story = await fetchStory(id)

  let metadata = await getMetadata(id, story.url, story.title)

  res.status(metadata ? Status.OK : Status.PARTIAL_CONTENT)
  res.setHeader('Cache-Control', 's-maxage=86400')
  res.json({ ...(metadata || {}), ...story })
}

const getMetadata = async (id: string, url: string, title: string) => {
  try {
    const itemUrl = `https://news.ycombinator.com/item?id=${id}`
    const storyUrl = String(url || itemUrl)

    const keywords = title.split(' ')

    return await metadataScraper(storyUrl, keywords, createTimeoutFetch(8000))
  } catch (error) {
    return undefined
  }
}
