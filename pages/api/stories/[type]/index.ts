import 'reflect-metadata'
import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import { StoryType } from 'lib/types'
import StorySerializer from 'lib/serializer/storySerializer'
import validateType from 'lib/validator/storyTypeValidator'
import DIContainer from 'lib/di-container'
import QueryService from 'lib/services/queryService'
import { uniquifyStories } from 'lib/utils/storiesHelper'
import DBConnection from 'lib/database/dbConnection'

export default async (req: NowRequest, res: NowResponse) => {
  const dbConnection = DIContainer.resolve<DBConnection>(DBConnection)
  const queryService = DIContainer.resolve<QueryService>(QueryService)
  const serializer = DIContainer.resolve<StorySerializer>(StorySerializer)

  await dbConnection.connect()

  const type = req.query.type as StoryType

  // Validate type
  if (!validateType(type)) return res.status(Status.BAD_REQUEST).json({ error: 'Wrong type.' })

  // Fetch stories
  let stories = await queryService.getStories(type)

  // Uniquify stories
  stories = uniquifyStories(stories)

  res.setHeader('Cache-Control', 'public, s-max-age=900')
  res.status(Status.OK)
  res.json({
    data: serializer.serializeStories(stories),
  })
}
