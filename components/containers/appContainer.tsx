import React, { useRef, useEffect } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import throttle from 'lodash.throttle'
import { useSetRecoilState, useRecoilState, useRecoilValueLoadable, useRecoilValue } from 'recoil'

import StoryList from '../features/stories/storyList'
import {
  filteredStoriesState,
  increaseStoryCountState,
  storyCountState,
  typeState,
} from '../../lib/store/recoil'
import config from '../../lib/config'
import { STORY_TYPES } from '../../lib/utils/constants'

type AppProps = {
  initialType?: string
}

const AppContainer: React.FC<AppProps> = ({ initialType = 'top' }) => {
  const stories = useRecoilValueLoadable(filteredStoriesState)
  const count = useRecoilValue(storyCountState)
  const [type, setType] = useRecoilState(typeState)
  const increaseStoryCount = useSetRecoilState(increaseStoryCountState)

  const prefetchTypes = () => {
    const { prefetch } = require('quicklink')

    STORY_TYPES.forEach(type => {
      if (type !== initialType) prefetch(`/api/stories/${type}`)
    })
  }

  useEffect(() => {
    setType(initialType)

    prefetchTypes()
  }, [initialType])

  const loadMore = useRef(throttle(() => increaseStoryCount(undefined), 2000)).current

  useBottomScrollListener(loadMore, {
    offset: config.loadMoreScrollOffset,
    triggerOnNoScroll: true,
  })

  return <StoryList stories={stories} count={count} />
}

export default AppContainer
