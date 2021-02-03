import { injectable, inject } from 'inversify'
import HackernewsClient from 'lib/clients/hackernewsClient'
import { Story, StoryType } from 'lib/types'
import StoryRepository from 'lib/repositories/storyRepository'
import config from 'lib/config'

@injectable()
class QueryService {
  @inject(HackernewsClient) private readonly hackernewsClient: HackernewsClient
  @inject(StoryRepository) private readonly storyRepository: StoryRepository

  public getStories = async (type: StoryType, max: number = config.maxStories) => {
    const storyIds = await this.hackernewsClient.fetchStoryIds(type)

    const stories = await this.storyRepository.findStories(storyIds.slice(0, max))
    return this.uniquifyStories(stories)
  }

  private uniquifyStories = (stories: Story[]): Story[] => {
    const uniquifiedStories = []

    for (const story of stories) {
      if (uniquifiedStories.map(story => story.id).includes(story.id)) continue

      uniquifiedStories.push(story)
    }

    return uniquifiedStories
  }
}

export default QueryService
