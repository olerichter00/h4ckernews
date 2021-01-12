import React from 'react'
import Truncate from 'react-truncate'
import StoryMeta from './storyMeta'

export type StoryContentProps = {
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

const StoryContent: React.FC<StoryContentProps> = ({
  titleLines,
  descriptionLines,
  onTruncateTitle,
  title,
  description,
  url,
  score,
  commentsUrl,
  commentsCount,
}) => {
  return (
    <div className="flex flex-col justify-between ml-3 mr-4 mt-4 h-full text-tiny leading-normal sm:mr-3 sm:mt-0 sm:mx-0 sm:pl-4 sm:pr-0 sm:pt-0 sm:w-full">
      <div className="text-neutral hover:text-primary text-base font-bold leading-tight transition-all sm:text-lg sm:font-semibold">
        <Truncate lines={titleLines} ellipsis={'...'} onTruncate={onTruncateTitle}>
          {title}
        </Truncate>
      </div>
      <div className="flex flex-col-reverse sm:flex-col sm:pt-1">
        <StoryMeta
          url={url}
          score={score}
          commentsUrl={commentsUrl}
          commentsCount={commentsCount}
        />
        <div className="dark:group-hover:text-gray-300 pt-2 group-hover:text-gray-600 sm:flex-1 sm:pt-1">
          <Truncate lines={descriptionLines} ellipsis={'...'}>
            {description || title}
          </Truncate>
        </div>
      </div>
    </div>
  )
}

export default StoryContent
