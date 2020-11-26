import { NowRequest, NowResponse } from '@vercel/node'

import { timeoutFetch } from '../../lib/utils'

export default async (req: NowRequest, res: NowResponse) => {
  ;['top', 'ask', 'show'].forEach(type => {
    fetch(`${baseUrl(req)}/stories?type=${type}`)
  })

  res.status(200).send({ status: 'ok' })
}

const baseUrl = (req: NowRequest) =>
  `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${req.headers.host}/api`
