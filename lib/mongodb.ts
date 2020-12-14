import * as mongoose from 'mongoose'

import config from './config'

mongoose.connect(config.mongoUri, (err: any) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log('Successfully Connected!')
  }
})

export interface IStories extends mongoose.Document {
  type: string
  stories: any[]
  updatedAt: string
}

export const StoriesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  stories: { type: Array, required: true },
  updatedAt: { type: String, required: true },
})

const Stories = mongoose.models.Stories || mongoose.model<IStories>('Stories', StoriesSchema)

export const getStories = async (type: string): Promise<[any[], number]> => {
  const result = await Stories.find({ type })

  const { stories = [], updatedAt = 0 } = result[0] ? result[0] : {}

  return [stories, parseInt(updatedAt)]
}

export const setStories = async (type: string, stories: any[]): Promise<[any[], number]> => {
  const updatedAt = new Date().getTime()

  await Stories.updateOne(
    { type },
    { stories, updatedAt },
    { upsert: true, setDefaultsOnInsert: true },
  )

  return [stories, updatedAt]
}

export default {
  get: getStories,
  set: setStories,
}
