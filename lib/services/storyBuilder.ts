import { inject, injectable } from 'inversify'
import HackernewsClient from '../clients/hackernewsClient'
import MetadataScraper from './metadataScraper'
import { StoryMetadata, Story } from '../types'

@injectable()
class StoryBuilder {
  @inject(HackernewsClient) protected hackernewsClient: HackernewsClient
  @inject(MetadataScraper) protected metadataScraper: MetadataScraper

  public getStory = async (id: string): Promise<Story> => {
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

      return await this.metadataScraper.scrape(storyUrl, keywords)
    } catch (error) {
      console.error(`Couldn not fetch metadata for story ${id}`)

      return {}
    }
  }
}

export default StoryBuilder
