import { NowRequest, NowResponse } from '@vercel/node'

import { fetchTopStories } from '../../lib/apiClient'

export default async (_req: NowRequest, res: NowResponse) => {
  const topStoryIds = await fetchTopStories()

  res.status(200).json(topStoryIds)
}
