import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import FadeTransition from '../common/fadeTransition'

import Spinner from '../common/spinner'
import Error from '../common/errorMessage'
import NoStories from '../common/noStories'
import Story from './story'
import useFilter from '../../hooks/useFilter'
import { storyTypeState, storyCountState, storiesState } from '../../lib/store/recoil'
import config from '../../lib/config'

export default function StoryList() {
  const count = useRecoilValue(storyCountState)
  const stories = useRecoilValueLoadable(storiesState)
  const type = useRecoilValue(storyTypeState)
  const [filter] = useFilter()

  if (stories.state === 'loading') return <Spinner />
  if (stories.state === 'hasError') return <Error />

  const storyList = stories.contents
    .filter(
      story =>
        story &&
        !(
          filter &&
          story.score < config.filterScoreThreshold &&
          story.descendants &&
          story.descendants < config.filterCommentsThreshold
        ),
    )
    .slice(0, count)

  if (storyList.length === 0) return <NoStories />

  return (
    <div className="sm:mx-3">
      {storyList.map(story => {
        return (
          <FadeTransition key={`${type}-${story.id}`}>
            <Story story={story} />
          </FadeTransition>
        )
      })}
    </div>
  )
}
