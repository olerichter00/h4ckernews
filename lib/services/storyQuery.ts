import { injectable, inject } from 'inversify'
import StoryCollections from '../collections/storyCollections'
import config from '../config'
import { StoryType } from '../types'

@injectable()
class StoryQuery {
  @inject(StoryCollections) protected storyCollections: StoryCollections

  public getStories = async (type: StoryType) => {
    const collection = await this.getCollection(type)

    return collection.find({ index: { $lte: config.maxStories } }).sort({ index: 1 })
  }

  private getCollection = async (type: StoryType) => {
    return this.storyCollections.get(type as StoryType)
  }
}

export default StoryQuery
