import { NowRequest, NowResponse } from '@vercel/node'

import { fetchStory } from '../../lib/apiClient'

export default async (req: NowRequest, res: NowResponse) => {
  const id = String(req.query.id)

  const story = await fetchStory(id)

  res.setHeader('Cache-Control', 's-maxage=86400')
  res.status(200).json(story)
}
