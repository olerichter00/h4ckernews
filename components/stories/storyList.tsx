import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import FadeTransition from '../common/fadeTransition'

import Spinner from '../common/spinner'
import Error from '../common/error'
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

  const storyList = stories.contents.slice(0, count).map(story => ({
    story: story,
    hide:
      !story ||
      (filter &&
        story.score < config.filterScoreThreshold &&
        story.descendants < config.filterCommentsThreshold),
  }))

  if (storyList.filter(story => !story.hide).length === 0) return <NoStories />

  return (
    <div className="sm:mx-3">
      {storyList.map(story => {
        return (
          <FadeTransition hide={story.hide} key={`${type}-${story.story.id}`}>
            <Story story={story.story} />
          </FadeTransition>
        )
      })}
    </div>
  )
}
