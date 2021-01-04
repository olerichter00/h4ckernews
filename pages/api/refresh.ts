import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import { timeoutFetch } from '../../lib/utils/timeoutHelper'

export default async (req: NowRequest, res: NowResponse) => {
  const types = ['top', 'ask', 'show']

  const baseUrl = `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${
    req.headers.host
  }/api`

  types.forEach(type => {
    timeoutFetch(`${baseUrl}/stories?type=${type}`, { timeout: 100 })
  })

  res.status(Status.OK).send({ status: 'ok' })
}
