import { useRecoilValue } from 'recoil'
import { useRecoilValueLoadable } from 'recoil'

import Spinner from '../common/spinner'
import Story from './story'
import { storyTypeState } from '../../lib/store/recoil'
import { storiesState } from '../../lib/store/recoil'

export default function StoryList() {
  const stories = useRecoilValueLoadable(storiesState)
  const type = useRecoilValue(storyTypeState)

  switch (stories.state) {
    case 'hasValue':
      // @ts-ignore
      const firstLoadingStoryIndex = stories.contents.findIndex(story => story.state === 'loading')

      return (
        <div className="mx-3">
          {/* @ts-ignore */}
          {stories.contents.map((story, index) => {
            const show = firstLoadingStoryIndex === -1 || index <= firstLoadingStoryIndex

            return <Story story={story} key={`${type}-${index}`} show={show} />
          })}
        </div>
      )
    case 'loading':
      return <Spinner />
    case 'hasError':
      return <div>Error...</div>
  }
}
