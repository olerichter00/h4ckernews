import React, { useEffect, useMemo, useState } from 'react'
import { Loadable, useRecoilValue } from 'recoil'
import FadeTransition from '../common/fadeTransition'

import Spinner from '../common/spinner'
import ErrorMessage from '../common/errorMessage'
import Story from './story'
import { filterState, TStory, Type } from '../../lib/store/recoil'

export type StoryListProps = {
  stories: Loadable<TStory[]>
  count: number
}
const StoryList: React.FC<StoryListProps> = ({ stories, count }) => {
  const [refresh, setRefresh] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)
  const [showSpinnerTimeout, setShowSpinnerTimeout] = useState<any>(undefined)
  const filter = useRecoilValue(filterState)

  useEffect(() => {
    setLoading(true)
    if (stories.state !== 'loading') setTimeout(() => setLoading(false), 100)
  }, [stories.state])

  useEffect(() => {
    clearTimeout(showSpinnerTimeout)
    setShowSpinner(false)

    if (stories.state === 'loading') {
      setShowSpinnerTimeout(setTimeout(() => setShowSpinner(true), 500))
    }
  }, [stories.state])

  useEffect(() => {
    if (stories.state !== 'loading') {
      setRefresh(refresh + 1)
    }
  }, [stories.state, filter])

  const storiesContent = useMemo(() => (stories.state === 'hasValue' ? stories.contents : []), [
    refresh,
  ])

  if (showSpinner) return <Spinner />

  if (stories.state === 'hasValue' && stories.contents.length === 0) return <ErrorMessage />
  if (stories.state === 'hasError') return <ErrorMessage />

  return (
    <div
      className={`duration-500 transition-opacity sm:mx-3 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      {storiesContent.slice(0, count).map(story => {
        return (
          <FadeTransition key={`${story.id}-${refresh}`}>
            <Story story={story} />
          </FadeTransition>
        )
      })}
    </div>
  )
}

export default StoryList
