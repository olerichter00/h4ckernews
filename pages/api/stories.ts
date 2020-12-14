import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import config from '../../lib/config'
import { fetchStories } from '../../lib/apiClient'
import { timeoutFetch } from '../../lib/utils/timeoutFetch'
import baseUrl from '../../lib/utils/baseUrl'
import mongoCache from '../../lib/mongodb'
import getFromCache from '../../lib/cache'

export default async (req: NowRequest, res: NowResponse) => {
  process.setMaxListeners(100)

  const type = String(req.query.type || 'top')
  const page = Number(req.query.page || 0)
  const pageSize = Number(req.query.pageSize || config.maxStories)

  const stories = await getFromCache(
    `${type}-${process.env.NODE_ENV}`,
    mongoCache,
    getStories(req.headers.host as string, type),
    { maxAge: 86400 },
    // { maxAge: 2 },
  )

  res.setHeader('Cache-Control', 'public, s-max-age=1, stale-while-revalidate')
  res.setHeader('App-Cache', stories.cache)
  res.setHeader('App-Cache-Date', new Date(stories.timestamp).toString())
  res.status(Status.OK).json({ data: stories.data })
}

const getStories = (host: string, type: string) => async () => {
  const storyIds = await fetchStories({ type })

  const stories = (await Promise.allSettled(storyIds.map(async id => await fetchStory(host, id))))
    .map(story => story.status === 'fulfilled' && story.value)
    .filter(story => story)

  return stories
}

const fetchStory = async (host: string | undefined, id: string) => {
  const requestUrl = `${baseUrl(host)}/stories/${id}`
  const response = await timeoutFetch(requestUrl)

  if (!response.ok) throw new Error('Failed to load story.')

  return await response.json()
}
