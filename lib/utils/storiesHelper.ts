import { Story } from 'lib/types'

export const uniquifyStories = (stories: Story[]): Story[] => {
  const uniquifiedStories = []

  for (const story of stories) {
    if (uniquifiedStories.map(story => story.id).includes(story.id)) continue

    uniquifiedStories.push(story)
  }

  return uniquifiedStories
}
