import { Model } from 'mongoose'
import { inject, injectable } from 'inversify'
import HackernewsClient from '../clients/hackernewsClient'
import { StoryType } from '../types'
import config from '../config'
import StoryBuilder from './storyBuilder'
import StoryCollections from '../collections/storyCollections'

@injectable()
class StoryUpdater {
  @inject(StoryCollections) protected storyCollections: StoryCollections
  @inject(StoryBuilder) protected storyBuilder: StoryBuilder
  @inject(HackernewsClient) protected hackernewsClient: HackernewsClient

  public update = async (type: StoryType) => {
    const collection = this.storyCollections.get(type)

    const storyIds = await this.hackernewsClient.fetchStoryIds(type)

    return Promise.allSettled(
      storyIds
        .slice(0, config.maxStories)
        .map((id: string, index: number) => this.saveStory(collection, id, index)),
    )
  }

  private saveStory = async (collection: Model<any>, id: string, index: number) => {
    const story = await this.storyBuilder.getStory(id)

    await collection.replaceOne({ index }, { index, ...story }, { upsert: true })
  }
}

export default StoryUpdater
