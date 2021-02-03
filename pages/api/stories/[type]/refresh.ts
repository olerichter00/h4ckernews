import 'reflect-metadata'
import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import { withTimeout } from 'lib/utils/timeoutHelper'
import { StoryType } from 'lib/types'
import validateType from 'lib/validator/storyTypeValidator'
import DIContainer from 'lib/di-container'
import UpdateService from 'lib/services/updateService'
import DBConnection from 'lib/database/dbConnection'

const TIMEOUT = 6000

export default async (req: NowRequest, res: NowResponse) => {
  // Increase maximum number of listeners
  process.setMaxListeners(100)

  const updateService = DIContainer.resolve<UpdateService>(UpdateService)
  const dbConnection = DIContainer.resolve<DBConnection>(DBConnection)

  await dbConnection.connect()

  const type = String(req.query.type || 'top') as StoryType

  // Validate type
  if (!validateType(type)) return res.status(Status.BAD_REQUEST).json({ error: 'Wrong type.' })

  // Update stories for type
  await withTimeout([updateService.update(type)], TIMEOUT)

  res.status(Status.OK).json({
    status: 'ok',
  })
}
