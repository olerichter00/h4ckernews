import { useSetRecoilState, useRecoilState } from 'recoil'

import { fetchStories } from '../lib/apiClient'
import { allStoryIdsState, storyType } from '../lib/store/recoil'

export default function Header() {
  const setStoryIds = useSetRecoilState(allStoryIdsState)
  const [type, setType] = useRecoilState(storyType)

  const showStories = async type => {
    const ids = await fetchStories({ type })
    setType(type)
    setStoryIds(ids)
  }

  return (
    <nav className="pl-2 pr-4 py-4 sm:py-5 shadow-md">
      <div className="max-w-3xl sm:px-2 m-auto items-center justify-between flex flex-wrap">
        <div className="flex ml-1 mr-3 items-center">
          <a href="#" onClick={() => showStories('top')}>
            <img src="logo.png" alt="Speak Everywhere" height="60" width="200" className="pt-1" />
          </a>

          <div className="ml-5 mr-1">
            <a href="#" onClick={() => showStories('top')}>
              <span
                className={`text-md text-orange-700 hover:underline ${
                  type === 'top' ? 'underline' : ''
                }`}
              >
                Top
              </span>
            </a>
          </div>

          <div className="mx-1">
            <a href="#" onClick={() => showStories('ask')}>
              <span
                className={`text-md text-orange-700 hover:underline ${
                  type === 'ask' ? 'underline' : ''
                }`}
              >
                Ask
              </span>
            </a>
          </div>

          <div className="mx-1">
            <a href="#" onClick={() => showStories('show')}>
              <span
                className={`text-md text-orange-700 hover:underline ${
                  type === 'show' ? 'underline' : ''
                }`}
              >
                Show
              </span>
            </a>
          </div>
        </div>

        <div className="hidden sm:block ml-3">
          <a href="https://github.com/olerichter00/h4ckernews">
            <span className="text-md text-orange-700 hover:underline">About</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
