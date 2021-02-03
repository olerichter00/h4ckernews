import 'reflect-metadata'
import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import { withTimeout } from 'lib/utils/timeoutHelper'
import { StoryType } from 'lib/types'
import validateType from 'lib/validator/storyTypeValidator'
import DIContainer from 'lib/di-container'
import DBConnection from 'lib/database/dbConnection'
import config from 'lib/config'
import QueryService from 'lib/services/queryService'

const TIMEOUT = 6000
const CACHED_IMAGES_COUNT = 10

export default async (req: NowRequest, res: NowResponse) => {
  // Increase maximum number of listeners
  process.setMaxListeners(100)

  const dbConnection = DIContainer.resolve<DBConnection>(DBConnection)

  await dbConnection.connect()

  const type = String(req.query.type || 'top') as StoryType

  // Validate type
  if (!validateType(type)) return res.status(Status.BAD_REQUEST).json({ error: 'Wrong type.' })

  // Refresh caches for stories and first images
  await withTimeout([refreshStoriesCache(type), refreshImageCaches(type)], TIMEOUT)

  res.status(Status.OK).json({
    status: 'ok',
  })
}

const refreshStoriesCache = async (type: StoryType) => {
  fetch(`${config.appUrl}/api/stories/${type}`)
}

const refreshImageCaches = async (type: StoryType) => {
  const queryService = DIContainer.resolve<QueryService>(QueryService)

  const stories = await queryService.getStories(type, CACHED_IMAGES_COUNT)

  await Promise.allSettled(
    stories.map(async story => {
      const imageUrl = encodeURIComponent(story.imageUrls ? story.imageUrls[0] : '')
      const keywords = encodeURIComponent(story.title.split(' ').join(','))

      await fetch(`${config.appUrl}/api/image?url=${imageUrl}&keywords=${keywords}`)
    }),
  )
}
