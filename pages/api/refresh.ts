import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import { timeoutFetch } from '../../lib/utils/timeoutHelper'
import config from '../../lib/config'

export default async (req: NowRequest, res: NowResponse) => {
  const types = ['top', 'ask', 'show']

  types.forEach(type => {
    fetch(`${config.appUrl}/api/stories?type=${type}`)
  })

  res.status(Status.OK).send({ status: 'ok' })
}
