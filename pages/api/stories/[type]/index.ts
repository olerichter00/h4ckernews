import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import { StoryType } from '../../../../lib/types'
import { serializeStories } from '../../../../lib/serializer/storySerializer'
import validateType from '../../../../lib/validator/storyTypeValidator'
import DIContainer from '../../../../lib/di-container'
import StoryQuery from '../../../../lib/services/storyQuery'
import { uniquifyStories } from '../../../../lib/utils/storiesHelper'
import DBConnection from '../../../../lib/database/dbConnection'

export default async (req: NowRequest, res: NowResponse) => {
  const storyQuery = DIContainer.resolve<StoryQuery>(StoryQuery)
  const dbConnection = DIContainer.resolve<DBConnection>(DBConnection)

  await dbConnection.connect()

  const type = req.query.type as StoryType

  if (!validateType(type)) return res.status(Status.BAD_REQUEST).json({ error: 'Wrong type.' })

  let stories = await storyQuery.getStories(type)

  res.setHeader('Cache-Control', 'public, s-max-age=900')
  res.status(Status.OK)
  res.json({
    data: serializeStories(uniquifyStories(stories)),
  })
}
