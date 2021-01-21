import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import dbConnect from '../../../../lib/database/dbConnect'
import storyCollections from '../../../../lib/collections/stories'
import { StoryType, Story } from '../../../../lib/types'
import { serializeStories } from '../../../../lib/serializer/storySerializer'
import validateType from '../../../../lib/validator/storyTypeValidator'
import config from '../../../../lib/config'

export default async (req: NowRequest, res: NowResponse) => {
  const type = req.query.type

  if (!validateType(type as StoryType))
    return res.status(Status.BAD_REQUEST).json({ error: 'Wrong type.' })

  await dbConnect()

  const collection = await storyCollections[type as StoryType]

  let stories = await collection.find({ index: { $lte: config.maxStories } }).sort({ index: 1 })

  stories = uniquifyStories(stories)

  res.setHeader('Cache-Control', 'public, s-max-age=900')
  res.status(Status.OK)
  res.json({
    count: stories.length,
    data: serializeStories(stories as Story[]),
  })
}

const uniquifyStories = (stories: Story[]): Story[] => {
  const uniquifiedStories = []

  for (const story of stories) {
    if (uniquifiedStories.map(story => story.id).includes(story.id)) continue

    uniquifiedStories.push(story)
  }

  return uniquifiedStories
}
