import { Loadable } from 'recoil'

import Story from './story'

type StoryListProps = {
  stories: Loadable<any>[]
}

export default function StoryList({ stories }: StoryListProps) {
  return (
    <div>
      {stories.map(story => (
        <Story
          story={story}
          key={story.contents ? story.contents.id : 'story-placeholder'}
        />
      ))}
    </div>
  )
}
