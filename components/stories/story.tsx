import React, { useState, useMemo } from 'react'

import { TStory } from '../../lib/store/recoil'
import PreloadedLink from '../common/preloadedLink'
import StoryImage from './storyImage'
import StoryContent from './storyContent'
import useIsMobile from '../../hooks/useIsMobile'

const MAX_LINES_DEKSTOP = 4
const MIN_TITLE_LINES = 1
const MAX_TITLE_LINES = 2
const MOBILE_TITLE_LINES = 4
const MOBILE_DESCRIPTION_LINES = 3

export type StoryProps = {
  story: TStory
}

const Story: React.FC<StoryProps> = ({ story }) => {
  const { title, url, score, text, id, descendants, description, imageUrls } = story

  if (!title) return <></>

  const [titleLines, setTitleLines] = useState(MIN_TITLE_LINES)
  const isMobile = useIsMobile()

  const itemUrl = `https://news.ycombinator.com/item?id=${id}`
  const maxLines = MAX_LINES_DEKSTOP
  const descriptionLines = maxLines - titleLines

  const onTruncateTitle = (isTruncated: boolean) => isTruncated && setTitleLines(MAX_TITLE_LINES)

  const unescapedText = useMemo(() => unescape(text || '').replace(/(<([^>]+)>)/gi, ''), [text])

  return (
    <div className="m-2 mb-3 sm:mb-6 sm:my-6">
      <PreloadedLink url={url || itemUrl}>
        <div className="group sm:dark:bg-transparent flex flex-col pb-4 max-w-full dark:bg-gray-800 bg-white rounded-xl overflow-hidden sm:flex-row sm:pb-0 sm:w-full sm:bg-transparent sm:rounded-none">
          <StoryImage
            imageUrls={imageUrls}
            keywords={title.split(' ')}
            placeholderText={title}
            key={`story-image-${id}`}
          />
          <StoryContent
            titleLines={isMobile ? MOBILE_TITLE_LINES : titleLines}
            descriptionLines={isMobile ? MOBILE_DESCRIPTION_LINES : descriptionLines}
            onTruncateTitle={onTruncateTitle}
            title={title}
            description={description || unescapedText}
            url={url || itemUrl}
            score={score}
            commentsUrl={itemUrl}
            commentsCount={descendants}
            key={`story-content-${id}`}
          />
        </div>
      </PreloadedLink>
    </div>
  )
}

export default Story
