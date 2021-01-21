import React from 'react'
import { Loadable, useRecoilValue } from 'recoil'
import FadeTransition from '../../elements/fadeTransition'
import useTransition from '../../../hooks/useTransition'
import Spinner from '../../elements/spinner'
import ErrorMessage from '../../elements/errorMessage'
import Story from './story'
import { filterState } from '../../../lib/store/recoil'
import { Story as TStory } from '../../../lib/types'
export type StoryListProps = {
  stories: Loadable<TStory[]>
  count: number
}
const StoryList: React.FC<StoryListProps> = ({ stories, count }) => {
  const filter = useRecoilValue(filterState)

  const [content, loading, longLoading, key] = useTransition<TStory[]>(stories, filter)

  if (longLoading) return <Spinner />

  if (
    stories.state === 'hasError' ||
    (stories.state === 'hasValue' && stories.contents?.length === 0)
  )
    return <ErrorMessage />

  return (
    <div
      className={`duration-500 transition-opacity sm:mx-3 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      {content.slice(0, count).map(story => {
        return (
          <FadeTransition key={`${story.id}-${key}`}>
            <Story story={story} />
          </FadeTransition>
        )
      })}
    </div>
  )
}

export default StoryList
