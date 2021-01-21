import * as mongoose from 'mongoose'
import config from '../config'
import { StoryType } from '../types'

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

// export const TopList = mongoose.models.TopList || mongoose.model('TopList', StorySchema)
// export const ShowList = mongoose.models.ShowList || mongoose.model('ShowList', StorySchema)
// export const AskList = mongoose.models.AskList || mongoose.model('AskList', StorySchema)

const types = config.storyTypes

const createCollectionName = (type: string) => type.charAt(0).toUpperCase() + type.slice(1) + 'List'

const storyCollections = types.reduce((collection: any, type: StoryType) => {
  const collectionName = createCollectionName(type)

  collection[type] = mongoose.models[collectionName] || mongoose.model(collectionName, StorySchema)

  return collection
}, {})

export default storyCollections
