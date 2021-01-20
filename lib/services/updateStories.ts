import { Model } from 'mongoose'
import { fetchStoryIds } from '../clients/hackernewsClient'
import storyCollections from '../collections/stories'
import { StoryType } from '../types'
import config from '../config'
import geStory from '../queries/storyQuery'

const updateStories = async (type: StoryType) => {
  const collection = storyCollections[type]

  const storyIds = await fetchStoryIds(type)

  return Promise.allSettled(
    storyIds.slice(0, config.maxStories).map((id, index) => addStory(collection, id, index)),
  )
}

const addStory = async (collection: Model<any, unknown>, id: string, index: number) => {
  const story = await geStory(id)

  await collection.replaceOne({ index }, { index, ...story }, { upsert: true })
}

export default updateStories
