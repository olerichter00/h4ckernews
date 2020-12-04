import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import { timeoutFetch } from '../../lib/utils/timeoutFetch'
import baseUrl from '../../lib/utils/baseUrl'

export default async (req: NowRequest, res: NowResponse) => {
  const types = ['top', 'ask', 'show']

  types.forEach(type => {
    timeoutFetch(`${baseUrl(req.headers.host)}/stories?type=${type}`, { timeout: 100 })
  })

  res.status(Status.OK).send({ status: 'ok' })
}
