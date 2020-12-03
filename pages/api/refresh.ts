import { NowRequest, NowResponse } from '@vercel/node'

import { timeoutFetch } from '../../lib/utils/timeoutFetch'

export default async (req: NowRequest, res: NowResponse) => {
  ;['top', 'ask', 'show'].forEach(type => {
    timeoutFetch(`${baseUrl(req)}/stories?type=${type}`, { timeout: 100 })
  })

  res.status(200).send({ status: 'ok' })
}

const baseUrl = (req: NowRequest) =>
  `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${req.headers.host}/api`
