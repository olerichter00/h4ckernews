import Truncate from 'react-truncate'
import { Loadable, useRecoilValueLoadable } from 'recoil'

import { metadataQuery } from '../lib/store/recoil'

type StoryProps = {
  story: Loadable<any>
}

export default function Story({ story }: StoryProps) {
  const { title = null, url = null } = story.contents

  const metadata = useRecoilValueLoadable(metadataQuery(url))

  const { description = null, imageUrl = null } = metadata.contents

  const prefetchUrl = () => {
    const { prefetch } = require('quicklink')
    prefetch(url)
  }

  return (
    <a href={url} target="_blank" rel="noopener" onMouseEnter={prefetchUrl}>
      <div className="flex flex-col sm:flex-row w-full max-w-full mb-8 mt-4 px-3 max-w-full">
        <div
          className="h-32 w-full mb-2 sm:mb-0 sm:h-32 sm:w-48 flex-none bg-cover bg-center rounded-md bg-gray-200 hover:opacity-75 transition-opacity duration-300 ease-in-out"
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
          title={title}
        ></div>

        <div className="h-full sm:h-32 w-full bg-white rounded-b sm:pl-3 sm:pr-5 sm:pl-4 sm:pr-5 flex flex-col justify-between leading-normal">
          <div className="mb-1 text-gray-900 font-bold text-lg sm:text-md leading-tight">
            <Truncate lines={2} ellipsis={'...'}>
              {title}
            </Truncate>
          </div>
          <div className="mb-1 text-sm text-orange-700 flexf items-center hover:underline">
            {url && new URL(url).hostname}
          </div>
          <div className="text-gray-600 text-sm mb-1 sm:flex-1">
            <Truncate lines={3} ellipsis={'...'}>
              {description}
            </Truncate>
          </div>
        </div>
      </div>
    </a>
  )
}
