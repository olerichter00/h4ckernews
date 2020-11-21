import { NowRequest, NowResponse } from '@vercel/node'

import { fetchStories } from '../../lib/apiClient'
import { MAX_STORIES } from '../../lib/config'

export default async (req: NowRequest, res: NowResponse) => {
  process.setMaxListeners(100)

  const type = String(req.query.type || 'top')
  const page = Number(req.query.page || 0)
  const pageSize = Number(req.query.pageSize || MAX_STORIES)

  const storyIds = await fetchStories({ type })

  const stories = await Promise.allSettled(
    storyIds.slice(page * pageSize, pageSize).map(async id => await fetchStory(req, id)),
  )

  res.setHeader('Cache-Control', 'public, s-max-age=1, stale-while-revalidate')
  res.status(200).json({ data: stories })
}

const fetchStory = async (req: NowRequest, id: string) => {
  const requestUrl = `${baseUrl(req)}/stories/${id}`
  const response = await fetch(requestUrl)

  if (!response.ok) throw new Error('Failed to load story.')

  return await response.json()
}

const baseUrl = req =>
  `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${req.headers.host}/api`
