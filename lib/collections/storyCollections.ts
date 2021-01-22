import * as mongoose from 'mongoose'
import { injectable } from 'inversify'
import { StoryType } from '../types'
import StorySchema from '../schemas/storySchema'

@injectable()
class StoryCollections {
  public async get(storyType: StoryType): mongoose.Model<any> {
    const collectionName = this.listCollectionName(storyType)

    return mongoose.models[collectionName] || mongoose.model(collectionName, StorySchema)
  }

  private listCollectionName(type: string) {
    return type.charAt(0).toUpperCase() + type.slice(1) + 'List'
  }
}

export default StoryCollections
