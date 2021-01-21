import * as mongoose from 'mongoose'
import { StoryType } from '../types'
import { STORY_TYPES } from '../utils/constants'

const StorySchema = new mongoose.Schema({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  score: { type: Number, required: true },
  text: { type: String, required: true },
  id: { type: String, required: true },
  descendants: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrls: { type: Array, required: true },
  favicon: { type: String, required: true },
  time: { type: Number, required: true },
})

const createListCollectionName = (type: string) =>
  type.charAt(0).toUpperCase() + type.slice(1) + 'List'

const storyCollections = STORY_TYPES.reduce((collection: any, type: StoryType) => {
  const collectionName = createListCollectionName(type)

  collection[type] = mongoose.models[collectionName] || mongoose.model(collectionName, StorySchema)

  return collection
}, {})

export default storyCollections
