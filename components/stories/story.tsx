import { useState } from 'react'

import { StoryType } from '../../lib/store/recoil'
import PreloadedLink from '../common/preloadedLink'
import StoryImage from './storyImage'
import StoryContent from './storyContent'
import useBreakpoint from '../../hooks/useBreakpoint'

const MAX_LINES_DEKSTOP = 5
const MIN_TITLE_LINES = 1
const MAX_TITLE_LINES = 2
const MOBILE_TITLE_LINES = 4
const MOBILE_DESCRIPTION_LINES = 4

type StoryProps = {
  story: StoryType
}

export default function Story({ story }: StoryProps) {
  const { title, url, score, text, id, descendants, description, imageUrls, favicon } = story
  const [titleLines, setTitleLines] = useState(MIN_TITLE_LINES)
  const { isMobile } = useBreakpoint()

  const itemUrl = `https://news.ycombinator.com/item?id=${id}`
  const maxLines = MAX_LINES_DEKSTOP
  const descriptionLines = maxLines - titleLines

  const onTruncateTitle = truncated => {
    if (!truncated) return

    setTitleLines(MAX_TITLE_LINES)
  }

  const unescapedText = unescape(text || '').replace(/(<([^>]+)>)/gi, '')

  return (
    <PreloadedLink url={url || itemUrl} className="hover:text-current">
      <div className="flex flex-col sm:mb-6 sm:flex-row w-full max-w-full my-8 max-w-full">
        <StoryImage imageUrls={imageUrls} placeholderText={title} key={`story-image-${id}`} />
        <StoryContent
          titleLines={isMobile ? MOBILE_TITLE_LINES : titleLines}
          descriptionLines={isMobile ? MOBILE_DESCRIPTION_LINES : descriptionLines}
          onTruncateTitle={onTruncateTitle}
          title={title}
          description={description || unescapedText}
          url={url}
          score={score}
          favicon={favicon}
          commentsUrl={itemUrl}
          commentsCount={descendants}
          loading={false}
          key={`story-content-${id}`}
        />
      </div>
    </PreloadedLink>
  )
}
