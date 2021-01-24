import * as mongoose from 'mongoose'

const StorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  score: { type: Number, required: true },
  time: { type: Number, required: true },
  imageUrls: { type: Array, required: true },
  url: { type: String, required: false },
  descendants: { type: Number, required: false },
  description: { type: String, required: false },
  favicon: { type: String, required: false },
})

const Story = mongoose.models['Story'] || mongoose.model('Story', StorySchema)

export default Story
