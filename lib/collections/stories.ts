import * as mongoose from 'mongoose'

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

export const TopList = mongoose.models.TopList || mongoose.model('TopList', StorySchema)
export const ShowList = mongoose.models.ShowList || mongoose.model('ShowList', StorySchema)
export const AskList = mongoose.models.AskList || mongoose.model('AskList', StorySchema)

const storyCollections = {
  top: TopList,
  show: ShowList,
  ask: AskList,
}

export default storyCollections
