import { useRecoilState, Loadable, useRecoilValueLoadable } from 'recoil'

import { metadataQuery, filterState } from '../../lib/store/recoil'
import FadeTransition from '../common/fadeTransition'
import PreloadedLink from '../common/preloadedLink'
import StoryImage from './storyImage'
import StoryContent from './storyContent'
import { useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'

const MAX_LINES_MOBILE = 5
const MAX_LINES_DEKSTOP = 4
const MIN_TITLE_LINES = 1
const MAX_TITLE_LINES = 2
const MOBILE_TITLE_LINES = 4
const MOBILE_DESCRIPTION_LINES = 4

const SCORE_THRESHOLD = 100
const COMMENTS_THRESHOLD = 100
type StoryProps = {
  story: Loadable<any>
  show: Boolean
}

export default function Story({ story, show }: StoryProps) {
  const {
    title = null,
    url = null,
    score = null,
    text = null,
    id = null,
    descendants = null,
  } = story.contents
  const [titleLines, setTitleLines] = useState(MIN_TITLE_LINES)
  const { isMobile } = useBreakpoint()
  const [filter] = useRecoilState(filterState)

  const itemUrl = `https://news.ycombinator.com/item?id=${id}`
  const maxLines = isMobile ? MAX_LINES_MOBILE : MAX_LINES_DEKSTOP
  const descriptionLines = maxLines - titleLines

  const onTruncateTitle = truncated => {
    if (!truncated) return

    setTitleLines(MAX_TITLE_LINES)
  }

  const [faviconLoadError, setFaviconLoadError] = useState(false)

  const metadata = useRecoilValueLoadable(metadataQuery(id))

  const unescapedText = unescape(text || '').replace(/(<([^>]+)>)/gi, '')
  const { description = unescapedText, imageUrls, favicon } = metadata.contents

  const hideStory = filter && score < SCORE_THRESHOLD && descendants < COMMENTS_THRESHOLD

  return (
    <PreloadedLink url={url || itemUrl} className="hover:text-current">
      <FadeTransition show={show && story.state !== 'loading'} hide={hideStory}>
        <div className="flex flex-col sm:mb-6 sm:flex-row w-full max-w-full my-8 max-w-full">
          <StoryImage imageUrls={imageUrls} />
          <StoryContent
            titleLines={isMobile ? MOBILE_TITLE_LINES : titleLines}
            descriptionLines={isMobile ? MOBILE_TITLE_LINES : descriptionLines}
            onTruncateTitle={onTruncateTitle}
            title={title}
            description={description}
            url={url}
            score={score}
            favicon={favicon}
            faviconLoadError={faviconLoadError}
            setFaviconLoadError={setFaviconLoadError}
            metadataState={metadata.state}
            commentsUrl={itemUrl}
            commentsCount={descendants}
          />
        </div>
      </FadeTransition>
    </PreloadedLink>
  )
}
