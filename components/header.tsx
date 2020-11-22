import { useRecoilState } from 'recoil'
import Headroom from 'react-headroom'
import Router from 'next/router'

import { storyTypeState } from '../lib/store/recoil'
import useColorScheme from '../hooks/useColorScheme'
import useFilter from '../hooks/useFilter'

export default function Header() {
  const [type, setType] = useRecoilState(storyTypeState)
  const [filter, switchFilter] = useFilter()

  const [colorScheme, switchColorScheme] = useColorScheme()

  const showStories = async type => {
    setType(type)
  }

  const backgroundColorClass = colorScheme === 'light' ? 'bg-white' : 'bg-gray-900'

  return (
    <Headroom upTolerance={10} downTolerance={10}>
      <nav className={`pl-2 pr-4 py-1 sm:py-2 sticky top-0 z-10 ${backgroundColorClass}`}>
        <div className="max-w-3xl sm:px-2 m-auto items-center justify-between text-neutral text-lg sm:text-xl font-semibold flex flex-no-wrap">
          <div className="flex ml-1 items-center">
            <a
              onClick={() => {
                Router.push('top')
                showStories('top')
              }}
              className="cursor-pointer"
            >
              <img src={'favicon.png'} alt="Speak Everywhere" className="w-auto h-10" />
            </a>

            <div className="ml-2 sm:ml-5 mr-1">
              <a
                onClick={() => {
                  Router.push('top')
                  showStories('top')
                }}
                className="cursor-pointer"
              >
                <span className={`${type === 'top' ? 'text-primary-700' : ''}`}>Top</span>
              </a>
            </div>

            <div className="mx-1">
              <a
                onClick={() => {
                  Router.push('ask')
                  showStories('ask')
                }}
                className="cursor-pointer"
              >
                <span className={`${type === 'ask' ? 'text-primary-700' : ''}`}>Ask</span>
              </a>
            </div>

            <div className="mx-1">
              <a
                onClick={() => {
                  Router.push('show')
                  showStories('show')
                }}
                className="cursor-pointer"
              >
                <span className={`${type === 'show' ? 'text-primary-700' : ''}`}>Show</span>
              </a>
            </div>
          </div>

          <div className="flex ml-2 items-center">
            <div className="sm:block flex sm:mt-2">
              <button onClick={() => switchColorScheme()} title="Switch color scheme.">
                {colorScheme === 'light' ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>

            <div className="sm:block ml-3 flex sm:mt-2">
              <button onClick={() => switchFilter()} title="Filter for important stories.">
                {filter ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19 19"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="sm:block flex ml-3 sm:mt-2 mt-1">
              <a href="https://github.com/olerichter00/h4ckernews" target="_blank" rel="noopener">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 19 19"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </Headroom>
  )
}
