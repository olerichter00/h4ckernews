import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import FadeTransition from '../common/fadeTransition'

import Spinner from '../common/spinner'
import Error from '../common/errorMessage'
import NoStories from '../common/noStories'
import Story from './story'
import { storyTypeState, filteredStoriesState } from '../../lib/store/recoil'

export default function StoryList() {
  const stories = useRecoilValueLoadable(filteredStoriesState)
  const type = useRecoilValue(storyTypeState)

  if (stories.state === 'loading') return <Spinner />
  if (stories.state === 'hasError') return <Error />

  if (stories.contents.length === 0) return <NoStories />

  return (
    <div className="sm:mx-3">
      {stories.contents.map(story => {
        return (
          <FadeTransition key={`${type}-${story.id}`}>
            <Story story={story} />
          </FadeTransition>
        )
      })}
    </div>
  )
}
