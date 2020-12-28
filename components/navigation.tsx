import { useRecoilState } from 'recoil'
import Headroom from 'react-headroom'
import Router from 'next/router'

import { storyTypeState, Type } from '../lib/store/recoil'
import useColorScheme from '../hooks/useColorScheme'
import useFilter from '../hooks/useFilter'
import NavItem from './navItem'

export default function Navigation() {
  const [type, setType] = useRecoilState(storyTypeState)
  const [filter, switchFilter] = useFilter()

  const [colorScheme, switchColorScheme] = useColorScheme()

  const showStories = (type: Type) => {
    Router.push(type)
    setType(type)
    window.scrollTo(0, 0)
  }

  return (
    <Headroom upTolerance={10} downTolerance={10}>
      <nav className={`bg-white dark:bg-gray-900 sticky top-0 z-10`}>
        <div
          className={
            'py-1 pl-2 pr-4 max-w-3xl sm:px-2 m-auto items-center justify-between text-xl sm:font-semibold flex flex-nowrap border-b border-gray-300 dark:border-gray-800'
          }
        >
          <div className="flex items-center">
            <NavItem onClick={() => showStories('top')}>
              <img src={'favicon.png'} className="h-10" />
            </NavItem>

            <NavItem onClick={() => showStories('top')} active={type === 'top'}>
              top
            </NavItem>
            <NavItem onClick={() => showStories('ask')} active={type === 'ask'}>
              ask
            </NavItem>
            <NavItem onClick={() => showStories('show')} active={type === 'show'}>
              show
            </NavItem>
          </div>

          <div className="flex items-center">
            <NavItem onClick={() => switchColorScheme()} title="Switch color scheme.">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {colorScheme === 'light' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                )}
              </svg>
            </NavItem>

            <NavItem onClick={() => switchFilter()} title="Filter for important stories.">
              {filter ? (
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
            </NavItem>

            <NavItem
              href="https://github.com/olerichter00/h4ckernews"
              target="_blank"
              rel="noopener"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{ paddingTop: '2px' }}
                viewBox="0 0 23 23"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </NavItem>
          </div>
        </div>
      </nav>
    </Headroom>
  )
}
