import { NowRequest, NowResponse } from '@vercel/node'

import { fetchStory } from '../../../lib/apiClient'
import { timeoutFetch } from '../../../lib/utils'
import { scrape } from '../../../lib/scraper/metadataScraper'

export default async (req: NowRequest, res: NowResponse) => {
  let statusCode = 200

  const id = req.query.id.toString()

  let story = await fetchStory(id)
  let metadata = {}

  try {
    const itemUrl = `https://news.ycombinator.com/item?id=${id}`
    const storyUrl = String(story.url || itemUrl)

    const keywords = story.title

    metadata = await scrape(storyUrl, keywords, timeoutFetch)
  } catch (error) {
    statusCode = 206
    console.error(error)
  }

  res.setHeader('Cache-Control', 's-maxage=86400')
  res.status(statusCode).json({ ...metadata, ...story })
}
