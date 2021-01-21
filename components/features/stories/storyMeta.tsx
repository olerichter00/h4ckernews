import React from 'react'
import { format } from 'timeago.js'

import PreloadedLink from '../../elements/preloadedLink'

type StoryMetaProps = {
  url: string
  score: number
  commentsUrl: string
  commentsCount: number
  time: number
}

const StoryMeta: React.FC<StoryMetaProps> = ({ time, url, score, commentsUrl, commentsCount }) => {
  return (
    <div className="flex flex-col-reverse text-sm sm:flex-col sm:mt-1">
      <div className="flex items-center m-auto mb-1 pb-0 pt-5 max-w-full text-gray-400 dark:text-gray-500 overflow-hidden sm:m-0 sm:pb-1 sm:pt-0">
        <div className="flex-grow mr-3 whitespace-nowrap overflow-ellipsis sm:flex-grow-0">
          {!!time && format(time * 1000)}
        </div>

        <div className="flex flex-row flex-nowrap mr-3">
          <span className="m-auto mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 23 23"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </span>
          {score}
        </div>
        <div className="white-space: nowrap; flex flex-row flex-grow flex-nowrap mr-3 hover:text-primary overflow-hidden sm:flex-grow-0">
          <span className="m-auto mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 23 23"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </span>
          <span className="overflow-hidden overflow-ellipsis">
            <a href={url}>{url && new URL(url).hostname}</a>
          </span>
        </div>

        <PreloadedLink url={commentsUrl}>
          <div className="flex flex-row flex-nowrap mr-3">
            <span className="m-auto mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 23 23"
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </span>
            {commentsCount || 0}
          </div>
        </PreloadedLink>
      </div>
    </div>
  )
}

export default StoryMeta
