import { injectable, inject } from 'inversify'
import HackernewsClient from 'lib/clients/hackernewsClient'
import { StoryType } from 'lib/types'
import StoryRepository from 'lib/repositories/storyRepository'
import config from 'lib/config'

@injectable()
class QueryService {
  @inject(HackernewsClient) private readonly hackernewsClient: HackernewsClient
  @inject(StoryRepository) private readonly storyRepository: StoryRepository

  public getStories = async (type: StoryType, max: number = config.maxStories) => {
    const storyIds = await this.hackernewsClient.fetchStoryIds(type)

    return this.storyRepository.findStories(storyIds.slice(0, max))
  }
}

export default QueryService
