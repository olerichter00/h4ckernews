import { inject, injectable } from 'inversify'
import HackernewsClient from '../clients/hackernewsClient'
import MetadataService from './metadataService'
import { StoryMetadata, Story } from '../types'

@injectable()
class BuildStoryService {
  @inject(HackernewsClient) private readonly hackernewsClient: HackernewsClient
  @inject(MetadataService) private readonly metadataService: MetadataService

  public buildStory = async (id: string): Promise<Story> => {
    const story = await this.hackernewsClient.fetchStory(id)
    const metadata = (await this.getMetadata(id, story.url, story.title.split(' '))) || {}

    return { ...metadata, ...story }
  }

  private getMetadata = async (
    id: string,
    url: string,
    keywords: string[],
  ): Promise<StoryMetadata> => {
    try {
      const itemUrl = `https://news.ycombinator.com/item?id=${id}`
      const storyUrl = String(url || itemUrl)

      return await this.metadataService.scrape(storyUrl, keywords)
    } catch (error) {
      console.error(`Couldn not fetch metadata for story ${id}`)

      return {}
    }
  }
}

export default BuildStoryService
