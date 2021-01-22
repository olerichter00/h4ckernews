import { Schema } from 'mongoose'

const StorySchema = new Schema({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  score: { type: Number, required: true },
  text: { type: String, required: true },
  id: { type: String, required: true },
  descendants: { type: Number, required: true },
  description: { type: String, required: false },
  imageUrls: { type: Array, required: true },
  favicon: { type: String, required: false },
  time: { type: Number, required: true },
})

export default StorySchema
