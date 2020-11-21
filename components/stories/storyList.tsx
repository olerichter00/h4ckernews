import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import FadeTransition from '../common/fadeTransition'

import Spinner from '../common/spinner'
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
  if (stories.state === 'hasError') return <div>Error...</div>

  return (
    <div className="sm:mx-3">
      {stories.contents
        .slice(0, count)
        .map(story => story.value)
        .map(story => {
          const hide =
            !story ||
            (filter &&
              story.score >= config.filterScoreThreshold &&
              story.descendants >= config.filterCommentsThreshold)
          return (
            <FadeTransition hide={hide}>
              <Story story={story} key={`${type}-${story.id}`} />
            </FadeTransition>
          )
        })}
    </div>
  )
}
