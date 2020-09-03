import { useRef } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import throttle from 'lodash.throttle'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import StoryList from './storyList'
import Spinner from './spinner'
import { increaseStoryCountState, storiesState, storyIdsState } from '../lib/store/recoil'

const LOAD_MORE_SCROLL_OFFSET = 800

export default function App() {
  const stories = useRecoilValue(storiesState)

  const increaseStoryCount = useSetRecoilState(increaseStoryCountState)

  const loadMore = useRef(throttle(() => increaseStoryCount(null), 2000)).current

  useBottomScrollListener(loadMore, LOAD_MORE_SCROLL_OFFSET)

  const firstLoadingStoryIndex = stories.findIndex(story => story.state === 'loading')

  const isLoading = firstLoadingStoryIndex !== stories.length

  return (
    <div className="max-w-full overflow-hidden">
      <StoryList stories={stories} />
      {isLoading ? <Spinner /> : null}
    </div>
  )
}
