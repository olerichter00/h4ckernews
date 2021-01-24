import { injectable } from 'inversify'
import { Story } from '../types'

@injectable()
class StorySerializer {
  public serializeStory = (story: Story) => ({
    title: story.title,
    url: story.url,
    score: story.score,
    id: story.id,
    descendants: story.descendants,
    description: story.description,
    imageUrls: story.imageUrls,
    favicon: story.favicon,
    time: story.time,
  })

  public serializeStories = (stories: Story[]) => stories.map(this.serializeStory)
}

export default StorySerializer
