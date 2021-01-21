import { fetchStory } from '../clients/hackernewsClient'
import metadataScraper from '../services/metadataScraper'
import { StoryMetadata, Story } from '../types'

const geStory = async (id: string): Promise<Story> => {
  const story = await fetchStory(id)
  const metadata = (await getMetadata(id, story.url, story.title.split(' '))) || {}

  return { ...metadata, ...story }
}

const getMetadata = async (id: string, url: string, keywords: string[]): Promise<StoryMetadata> => {
  try {
    const itemUrl = `https://news.ycombinator.com/item?id=${id}`
    const storyUrl = String(url || itemUrl)

    return await metadataScraper.scrape(storyUrl, keywords)
  } catch (error) {
    console.error(`Couldn not fetch metadata for story ${id}`)

    return {}
  }
}

export default geStory
