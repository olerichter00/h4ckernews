import { useRecoilValue, useRecoilValueLoadable, Loadable } from 'recoil'

import Spinner from '../common/spinner'
import Story from './story'
import { storyTypeState } from '../../lib/store/recoil'
import { storiesState } from '../../lib/store/recoil'

export default function StoryList() {
  const stories = useRecoilValueLoadable(storiesState)
  const type = useRecoilValue(storyTypeState)

  if (stories.state === 'loading') return <Spinner />
  if (stories.state === 'hasError') return <div>Error...</div>

  const storyContents = stories.contents as Array<Loadable<any>>
  const firstLoadingStoryIndex = storyContents.findIndex(story => story.state === 'loading')

  return (
    <div className="sm:mx-3">
      {storyContents.map((story, index) => {
        const show = firstLoadingStoryIndex === -1 || index <= firstLoadingStoryIndex

        return <Story story={story} key={`${type}-${index}`} show={show} />
      })}
    </div>
  )
}
