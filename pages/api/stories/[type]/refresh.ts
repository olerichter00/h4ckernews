import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import { withTimeout } from '../../../../lib/utils/timeoutHelper'
import dbConnect from '../../../../lib/utils/dbConnect'
import { StoryType } from '../../../../lib/types'
import updateStories from '../../../../lib/services/updateStories'
import validateType from '../../../../lib/validator/storyTypeValidator'

const TIMEOUT = 7000

export default async (req: NowRequest, res: NowResponse) => {
  process.setMaxListeners(100)

  const type = String(req.query.type || 'top')

  if (!validateType(type)) return res.status(Status.BAD_REQUEST).json({ error: 'Wrong type.' })

  await dbConnect()

  await withTimeout(updateStories(type as StoryType), TIMEOUT)

  res.status(Status.OK).json({
    status: 'ok',
  })
}
