import React, { useState, useMemo } from 'react'
import { Story as TStory } from '../../../lib/types'
import StoryImage from './storyImage'
import StoryContent from './storyContent'
import useIsMobile from '../../../hooks/useIsMobile'

const MAX_LINES_DEKSTOP = 4
const MIN_TITLE_LINES = 1
const MAX_TITLE_LINES = 2
const MOBILE_TITLE_LINES = 4
const MOBILE_DESCRIPTION_LINES = 3

export type StoryProps = {
  story: TStory
}

const Story: React.FC<StoryProps> = ({ story }) => {
  const { title, url, score, text, id, descendants, description, imageUrls, time } = story

  if (!title) return <div></div>

  const [titleLines, setTitleLines] = useState(MIN_TITLE_LINES)
  const isMobile = useIsMobile()

  const itemUrl = `https://news.ycombinator.com/item?id=${id}`
  const maxLines = MAX_LINES_DEKSTOP
  const descriptionLines = maxLines - titleLines

  const onTruncateTitle = (isTruncated: boolean) => isTruncated && setTitleLines(MAX_TITLE_LINES)

  const unescapedText = useMemo(() => unescape(text || '').replace(/(<([^>]+)>)/gi, ''), [text])

  return (
    <div className="m-3 mb-7 mt-3 sm:mb-9 sm:mt-6 sm:my-8">
      <div className="group sm:dark:bg-transparent flex flex-col pb-6 max-w-full border-b border-gray-100 dark:border-gray-800 sm:flex-row sm:pb-0 sm:w-full sm:bg-transparent sm:border-none sm:rounded-none">
        <StoryImage
          imageUrls={imageUrls || []}
          keywords={title.split(' ')}
          placeholderText={title}
          key={`story-image-${id}`}
          url={url || itemUrl}
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
          time={time}
        />
      </div>
    </div>
  )
}

export default Story
