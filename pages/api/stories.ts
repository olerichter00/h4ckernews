import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import config from '../../lib/config'
import { fetchStories } from '../../lib/apiClient'
import { timeoutFetch } from '../../lib/utils/timeoutFetch'
import baseUrl from '../../lib/utils/baseUrl'

export default async (req: NowRequest, res: NowResponse) => {
  process.setMaxListeners(100)

  const type = String(req.query.type || 'top')
  const page = Number(req.query.page || 0)
  const pageSize = Number(req.query.pageSize || config.maxStories)

  const storyIds = await fetchStories({ type })

  const stories = (
    await Promise.allSettled(
      storyIds
        .slice(page * pageSize, pageSize)
        .map(async id => await fetchStory(req.headers.host, id)),
    )
  )
    .map(story => story.status === 'fulfilled' && story.value)
    .filter(story => story)

  res.setHeader('Cache-Control', 'public, s-max-age=0, stale-while-revalidate')
  res.status(Status.OK).json({ data: stories })
}

const fetchStory = async (host: string | undefined, id: string) => {
  const requestUrl = `${baseUrl(host)}/stories/${id}`
  const response = await timeoutFetch(requestUrl)

  if (!response.ok) throw new Error('Failed to load story.')

  return await response.json()
}
