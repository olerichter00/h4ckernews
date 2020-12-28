import React from 'react'
import Truncate from 'react-truncate'

type StoryContentProps = {
  titleLines: number
  descriptionLines: number
  onTruncateTitle: (isTruncated: boolean) => void
  title: string
  description: string
  url: string
  score: number
  commentsUrl: string
  commentsCount: number
}

export default function StoryContent({
  titleLines,
  descriptionLines,
  onTruncateTitle,
  title,
  description,
  url,
  score,
  commentsUrl,
  commentsCount,
}: StoryContentProps) {
  return (
    <div className="mt-2 sm:mt-0 h-full sm:w-full mx-3 mr-4 sm:mr-3 pt-1 sm:pt-0 sm:mx-0 sm:pl-4 sm:pr-0 sm:pl-4 flex flex-col justify-between leading-normal text-sm sm:text-tiny">
      <div className="mt-2 sm:mt-0 text-neutral font-bold sm:font-semibold text-base sm:text-lg leading-tight hover:text-primary">
        <Truncate lines={titleLines} ellipsis={'...'} onTruncate={onTruncateTitle}>
          {title}
        </Truncate>
      </div>
      <div className="flex flex-col-reverse sm:flex-col mt-1 sm:mt-1">
        <div className="flex max-w-full overflow-hidden mb-1 items-center sm:m-0 m-auto pb-0 sm:pb-1 pt-5 sm:pt-0 text-gray-500 dark:text-gray-400">
          <div className="mr-3 flex flex-row flex-nowrap">
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
          <a href={url}>
            <div className="mr-3 flex flex-row flex-nowrap flex-grow sm:flex-grow-0 overflow-hidden">
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
              <span className="overflow-ellipsis overflow-hidden">
                {url && new URL(url).hostname}
              </span>
            </div>
          </a>

          <a href={commentsUrl}>
            <div className="mr-3 flex flex-row flex-nowrap">
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
          </a>
        </div>
        <div className="sm:flex-1 pt-2 sm:pt-0">
          <Truncate lines={descriptionLines} ellipsis={'...'}>
            {description || title}
          </Truncate>
        </div>
      </div>
    </div>
  )
}
