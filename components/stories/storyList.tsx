import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import FadeTransition from '../common/fadeTransition'

import Spinner from '../common/spinner'
import Story from './story'
import { storyTypeState, storyCountState, storiesState, filterState } from '../../lib/store/recoil'
import {
  FILTER_SCORE_THRESHOLD,
  FILTER_COMMENTS_THRESHOLD,
  DEFAULT_PAGE_SIZE,
} from '../../lib/config'

export default function StoryList() {
  const count = useRecoilValue(storyCountState)
  const stories = useRecoilValueLoadable(storiesState)
  const type = useRecoilValue(storyTypeState)
  const [filter] = useRecoilState(filterState)

  if (stories.state === 'loading') return <Spinner />
  if (stories.state === 'hasError') return <div>Error...</div>

  return (
    <div className="sm:mx-3">
      {stories.contents
        .slice(0, count)
        .map(story => story.value)
        .filter(
          story =>
            story &&
            (!filter ||
              story.score >= FILTER_SCORE_THRESHOLD ||
              story.descendants >= FILTER_COMMENTS_THRESHOLD),
        )
        .map((story, index) => (
          <FadeTransition timeout={index < DEFAULT_PAGE_SIZE ? 200 + index * 200 : 0}>
            <Story story={story} key={`${type}-${index}`} />
          </FadeTransition>
        ))}
    </div>
  )
}
