import 'reflect-metadata'
import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import { StoryType } from 'lib/types'
import StorySerializer from 'lib/serializer/storySerializer'
import validateType from 'lib/validator/storyTypeValidator'
import DIContainer from 'lib/di-container'
import QueryService from 'lib/services/queryService'
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
  const stories = await queryService.getStories(type)

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.status(Status.OK)
  res.json({
    data: serializer.serializeStories(stories),
  })
}
