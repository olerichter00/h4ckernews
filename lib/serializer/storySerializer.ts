import { injectable } from 'inversify'
import { Story } from 'lib/types'

@injectable()
class StorySerializer {
  public serializeStory = (story: Story & any): Story => ({
    title: story.title,
    text: story.text,
    url: story.url,
    score: story.score,
    id: story.id,
    descendants: story.descendants,
    description: story.description,
    imageUrls: story.imageUrls,
    favicon: story.favicon,
    time: story.time,
  })

  public serializeStories = (stories: (Story & any)[]): Story[] => stories.map(this.serializeStory)
}

export default StorySerializer
