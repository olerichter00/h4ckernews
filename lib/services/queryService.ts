import { injectable, inject } from 'inversify'
import HackernewsClient from '../clients/hackernewsClient'
import { StoryType } from '../types'
import StoryRepository from '../repositories/storyRepository'

@injectable()
class QueryService {
  @inject(HackernewsClient) private readonly hackernewsClient: HackernewsClient
  @inject(StoryRepository) private readonly storyRepository: StoryRepository

  public getStories = async (type: StoryType) => {
    const storyIds = await this.hackernewsClient.fetchStoryIds(type)

    return this.storyRepository.findStories(storyIds)
  }
}

export default QueryService
