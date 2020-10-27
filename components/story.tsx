import Truncate from 'react-truncate'
import { Loadable, useRecoilValueLoadable } from 'recoil'

import { metadataQuery } from '../lib/store/recoil'
import FadeTransition from './fadeTransition'
import PreloadedLink from './preloadedLink'
import { useState } from 'react'

type StoryProps = {
  story: Loadable<any>
  show: Boolean
}

export default function Story({ story, show }: StoryProps) {
  const { title = null, url = null, score = null, text = null, id = null } = story.contents
  const [titleLines, setTitleLines] = useState(1)
  const descriptionLines = 4 - titleLines

  const onTruncateTitle = truncated => {
    if (!truncated) return

    setTitleLines(2)
  }

  const [faviconLoadError, setFaviconLoadError] = useState(false)

  const metadata = useRecoilValueLoadable(metadataQuery(url))

  const { description = null, imageUrl = null, favicon = null } = metadata.contents

  return (
    <div>
      <PreloadedLink
        url={url || `https://news.ycombinator.com/item?id=${id}`}
        className="hover:text-current"
      >
        <FadeTransition show={show && story.state !== 'loading'}>
          <div className="flex flex-col sm:flex-row w-full max-w-full my-5 max-w-full">
            <FadeTransition show={metadata.state !== 'loading'}>
              <div
                className="overflow-hidden h-40 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none bg-cover bg-center rounded-md bg-gray-200 hover:opacity-75 transition-opacity duration-500 ease-in-out"
                style={{
                  backgroundImage: `url('${imageUrl}')`,
                }}
              ></div>
            </FadeTransition>

            <div className="h-full sm:h-32 w-full rounded-b sm:pl-3 sm:pr-5 sm:pl-4 sm:pr-5 flex flex-col justify-between leading-normal">
              <a>
                <div className="mb-1 text-neutral font-bold text-lg sm:text-md leading-tight">
                  <Truncate lines={titleLines} ellipsis={'...'} onTruncate={onTruncateTitle}>
                    {title}
                  </Truncate>
                </div>
              </a>

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
                  <div className="text-gray-600">
                    <span className="inline-block align-middle mr-1">
                      {favicon && !faviconLoadError ? (
                        <span>
                          <img
                            className="h-3 w-3"
                            src={favicon}
                            onError={() => setFaviconLoadError(true)}
                          />
                        </span>
                      ) : (
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
                      )}
                    </span>

                    <span className="inline-block align-middle hover:underline">
                      {new URL(url).hostname}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-neutral text-sm mb-1 sm:flex-1">
                <FadeTransition show={metadata.state !== 'loading'}>
                  <Truncate lines={descriptionLines} ellipsis={'...'}>
                    {description || (text && unescape(text))}
                  </Truncate>
                </FadeTransition>
              </div>
            </div>
          </div>
        </FadeTransition>
      </PreloadedLink>
    </div>
  )
}
