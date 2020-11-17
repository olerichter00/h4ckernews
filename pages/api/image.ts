import { NowRequest, NowResponse } from '@vercel/node'

import { timeoutFetch } from '../../lib/utils'

export default async (req: NowRequest, res: NowResponse) => {
  const url = String(req.query.url)

  const imageResponse = await timeoutFetch(url, 1000)

  const data = imageResponse.body

  res.setHeader('Cache-Control', 's-maxage=86400')
  res.status(imageResponse.status).send(data)
}
