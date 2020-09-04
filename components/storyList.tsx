import { Loadable, useRecoilValue } from 'recoil'

import Story from './story'
import { storyType } from '../lib/store/recoil'

type StoryListProps = {
  stories: Loadable<any>[]
}

export default function StoryList({ stories }: StoryListProps) {
  const firstLoadingStoryIndex = stories.findIndex(story => story.state === 'loading')
  const type = useRecoilValue(storyType)

  return (
    <div>
      {stories.map((story, index) => {
        const show = firstLoadingStoryIndex === -1 || index <= firstLoadingStoryIndex

        return <Story story={story} key={`${type}-${index}`} show={show} />
      })}
    </div>
  )
}
