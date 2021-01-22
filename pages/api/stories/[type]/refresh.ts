import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import { withTimeout } from '../../../../lib/utils/timeoutHelper'
import { StoryType } from '../../../../lib/types'
import validateType from '../../../../lib/validator/storyTypeValidator'
import DIContainer from '../../../../lib/di-container'
import StoryUpdater from '../../../../lib/services/storyUpdater'
import DBConnection from '../../../../lib/database/dbConnection'

const TIMEOUT = 7000

export default async (req: NowRequest, res: NowResponse) => {
  // Increase maximum number of listeners
  process.setMaxListeners(100)

  const storyUpdater = DIContainer.resolve<StoryUpdater>(StoryUpdater)
  const dbConnection = DIContainer.resolve<DBConnection>(DBConnection)

  await dbConnection.connect()

  const type = String(req.query.type || 'top') as StoryType

  if (!validateType(type)) return res.status(Status.BAD_REQUEST).json({ error: 'Wrong type.' })

  await withTimeout(storyUpdater.update(type), TIMEOUT)

  res.status(Status.OK).json({
    status: 'ok',
  })
}
