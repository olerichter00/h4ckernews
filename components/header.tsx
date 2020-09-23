import { useRecoilState } from 'recoil'
import Headroom from 'react-headroom'

import { storyType } from '../lib/store/recoil'

export default function Header() {
  const [type, setType] = useRecoilState(storyType)

  const showStories = async type => {
    setType(type)
  }

  return (
    <Headroom>
      <nav className="pl-2 pr-4 py-3 shadow-lg sticky top-0 bg-white z-10">
        <div className="max-w-3xl sm:px-2 m-auto items-center justify-between text-orange-700 font-semibold flex flex-wrap">
          <div className="flex ml-1 mr-3 items-center">
            <a href="#" onClick={() => showStories('top')}>
              <img src="logo.png" alt="Speak Everywhere" height="60" width="200" className="pt-1" />
            </a>

            <div className="ml-5 mr-1">
              <a href="#" onClick={() => showStories('top')}>
                <span className={`text-md hover:underline ${type === 'top' ? 'underline' : ''}`}>
                  Top
                </span>
              </a>
            </div>

            <div className="mx-1">
              <a href="#" onClick={() => showStories('ask')}>
                <span
                  className={`text-md font-semibold hover:underline ${
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
                  className={`text-md font-semibold hover:underline ${
                    type === 'show' ? 'underline' : ''
                  }`}
                >
                  Show
                </span>
              </a>
            </div>
          </div>

          <div className="hidden sm:block ml-3">
            <a href="https://github.com/olerichter00/h4ckernews" target="_blank" rel="noopener">
              <span className="text-md font-semibold hover:underline">About</span>
            </a>
          </div>
        </div>
      </nav>
    </Headroom>
  )
}
