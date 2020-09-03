import { Loadable } from 'recoil'

import Story from './story'

type StoryListProps = {
  stories: Loadable<any>[]
}

export default function StoryList({ stories }: StoryListProps) {
  const firstLoadingStoryIndex = stories.findIndex(story => story.state === 'loading')

  return (
    <div>
      {stories.map((story, index) => {
        const show = firstLoadingStoryIndex === -1 || index <= firstLoadingStoryIndex

        return <Story story={story} key={index} show={show} />
      })}
    </div>
  )
}
