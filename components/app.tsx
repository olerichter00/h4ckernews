import { useRef } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import throttle from 'lodash.throttle'
import { useSetRecoilState } from 'recoil'

import StoryList from './stories/storyList'
import { increaseStoryCountState } from '../lib/store/recoil'

const LOAD_MORE_SCROLL_OFFSET = 1600

export default function App() {
  const increaseStoryCount = useSetRecoilState(increaseStoryCountState)

  const loadMore = useRef(throttle(() => increaseStoryCount(null), 2000)).current

  useBottomScrollListener(loadMore, LOAD_MORE_SCROLL_OFFSET)

  return <StoryList />
}
