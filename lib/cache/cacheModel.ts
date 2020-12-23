import * as mongoose from 'mongoose'

import config from '../config'

mongoose.connect(config.mongoUri, (err: any) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log('Successfully Connected!')
  }
})

interface ICache extends mongoose.Document {
  key: string
  content: any
}

export const CacheSchema = new mongoose.Schema({
  key: { type: String, required: true },
  content: { type: Object, required: true },
  updatedAt: { type: String, required: true },
})

export const Cache = mongoose.models.Cache || mongoose.model<ICache>('Cache', CacheSchema)
