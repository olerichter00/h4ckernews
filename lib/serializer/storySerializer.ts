import { Story } from '../types'

const serializeStories = (stories: Story[]) =>
  stories.map(story => ({
    title: story.title,
    url: story.url,
    score: story.score,
    text: story.text,
    id: story.id,
    descendants: story.descendants,
    description: story.description,
    imageUrls: story.imageUrls,
    favicon: story.favicon,
    time: story.time,
  }))

export default serializeStories
