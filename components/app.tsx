import { useRef, useEffect } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import throttle from 'lodash.throttle'
import { useSetRecoilState, useRecoilState } from 'recoil'

import StoryList from './stories/storyList'
import { increaseStoryCountState, typeState } from '../lib/store/recoil'
import config from '../lib/config'

type AppProps = {
  type?: string
}

export default function App({ type = 'top' }: AppProps) {
  const [_, setType] = useRecoilState(typeState)
  const increaseStoryCount = useSetRecoilState(increaseStoryCountState)

  useEffect(() => {
    setType(type)
  }, [type])

  const loadMore = useRef(throttle(() => increaseStoryCount(null), 2000)).current

  useBottomScrollListener(loadMore, config.loadMoreScrollOffset)

  return <StoryList />
}
