import React from 'react'
import Truncate from 'react-truncate'

type StoryContentProps = {
  titleLines: Number
  descriptionLines: Number
  onTruncateTitle: Function
  title: string
  description: string
  url: string
  score: number
  favicon?: string
  loading: boolean
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
  favicon,
  loading,
  commentsUrl,
  commentsCount,
}: StoryContentProps) {
  return (
    <div
      style={{ marginTop: '0.1rem' }}
      className="h-full sm:w-full mx-3 sm:mx-0 sm:pl-4 sm:pr-0 sm:pl-4 flex flex-col justify-between leading-normal text-sm"
    >
      <div className="mb-1 text-neutral font-semibold text-lg sm:text-md leading-tight hover:text-primary-700">
        <Truncate lines={titleLines} ellipsis={'...'} onTruncate={onTruncateTitle}>
          {title}
        </Truncate>
      </div>

      <div className="flex mb-1 text-smitems-center ">
        <div className="text-primary-700 mr-3">
          <span className="inline-block align-middle mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </span>
          <span className="inline-block align-middle">{score}</span>
        </div>

        {url && (
          <div className="text-gray-600 mr-3">
            <a href={url}>
              <span className="inline-block align-middle w-3 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>

              <span className="inline-block align-middle ">{new URL(url).hostname}</span>
            </a>
          </div>
        )}

        <div className="text-gray-600 mr-3">
          <a href={commentsUrl}>
            <span className="inline-block align-middle mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </span>

            <span className="inline-block align-middle">{commentsCount} Comments</span>
          </a>
        </div>
      </div>
      <div className="sm:flex-1">
        <Truncate lines={descriptionLines} ellipsis={'...'}>
          {description || title}
        </Truncate>
      </div>
    </div>
  )
}
