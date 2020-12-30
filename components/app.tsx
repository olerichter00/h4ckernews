import { useRef, useEffect } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import throttle from 'lodash.throttle'
import { useSetRecoilState, useRecoilState, useRecoilValueLoadable, useRecoilValue } from 'recoil'

import StoryList from './stories/storyList'
import { filteredStoriesState, increaseStoryCountState, typeState } from '../lib/store/recoil'
import config from '../lib/config'

type AppProps = {
  initialType?: string
}

export default function App({ initialType = 'top' }: AppProps) {
  const stories = useRecoilValueLoadable(filteredStoriesState)

  const [type, setType] = useRecoilState(typeState)
  const increaseStoryCount = useSetRecoilState(increaseStoryCountState)

  useEffect(() => {
    setType(initialType)
  }, [initialType])

  const loadMore = useRef(throttle(() => increaseStoryCount(undefined), 2000)).current

  useBottomScrollListener(loadMore, config.loadMoreScrollOffset)

  return <StoryList stories={stories} type={type} />
}
