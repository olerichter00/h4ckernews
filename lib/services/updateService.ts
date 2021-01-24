import { inject, injectable } from 'inversify'
import HackernewsClient from '../clients/hackernewsClient'
import { StoryType } from '../types'
import config from '../config'
import BuildStoryService from './buildStoryService'
import StoryRepository from '../repositories/storyRepository'

@injectable()
class UpdateService {
  @inject(BuildStoryService) private readonly buildStoryService: BuildStoryService
  @inject(HackernewsClient) private readonly hackernewsClient: HackernewsClient
  @inject(StoryRepository) private readonly storyRepository: StoryRepository

  public update = async (type: StoryType) => {
    const storyIds = await this.hackernewsClient.fetchStoryIds(type)

    return Promise.allSettled(storyIds.slice(0, config.maxStories).map(this.saveStory))
  }

  private saveStory = async (id: string) => {
    try {
      const savedStory = await this.storyRepository.findStory(id)

      if (savedStory) return

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
