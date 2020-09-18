import { Loadable, useRecoilValue } from 'recoil'
import { useRecoilValueLoadable } from 'recoil'

import Spinner from './spinner'
import Story from './story'
import { storyType } from '../lib/store/recoil'
import { storiesState } from '../lib/store/recoil'

export default function StoryList() {
  const stories = useRecoilValueLoadable(storiesState)
  const type = useRecoilValue(storyType)

  switch (stories.state) {
    case 'hasValue':
      // @ts-ignore
      const firstLoadingStoryIndex = stories.contents.findIndex(story => story.state === 'loading')

      return (
        <div>
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
