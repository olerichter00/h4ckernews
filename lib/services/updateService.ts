import { inject, injectable } from 'inversify'
import HackernewsClient from 'lib/clients/hackernewsClient'
import { Story, StoryType } from 'lib/types'
import config from 'lib/config'
import BuildStoryService from 'lib/services/buildStoryService'
import StoryRepository from 'lib/repositories/storyRepository'
import QueryService from './queryService'

@injectable()
class UpdateService {
  @inject(BuildStoryService) private readonly buildStoryService: BuildStoryService
  @inject(HackernewsClient) private readonly hackernewsClient: HackernewsClient
  @inject(StoryRepository) private readonly storyRepository: StoryRepository
  @inject(QueryService) private readonly queryService: QueryService

  public update = async (type: StoryType, max: number = config.maxStories) => {
    const storyIds = await this.newStoryIds(type, max)

    await Promise.allSettled(storyIds.map(id => this.saveStory(id)))
  }

  private newStoryIds = async (type: StoryType, max: number) => {
    const storyIds = await this.hackernewsClient.fetchStoryIds(type)

    const savedStories = await this.queryService.getStories(type)
    const savedStoryIds = savedStories.map(story => story.id)

    return storyIds.slice(0, max).filter(id => !savedStoryIds.includes(String(id)))
  }

  private saveStory = async (id: string) => {
    try {
      console.count('MISS')

      const story = await this.buildStoryService.buildStory(id)

      await this.storyRepository.createStory(story)
    } catch (error) {
      console.error(error)
      console.count('Failed to save.')
    }
  }
}

export default UpdateService
