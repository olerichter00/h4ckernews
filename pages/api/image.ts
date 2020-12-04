import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import fetchImagesFromSearch from '../../lib/clients/imageSearchApiClient'
import fetchImagesFromUnsplash from '../../lib/clients/unsplashSearchApiClient'
import cleanKeywords from '../../lib/pageMetaScraper/utils/keywordCleaner'

export default async (req: NowRequest, res: NowResponse) => {
  const keywordParams = decodeURIComponent(String(req.query.keywords))

  const keywords = cleanKeywords(keywordParams.split(','))

  for (const url of await fallbackImages(keywords)) {
    const imageResponse = await fetch(url)

    if (imageResponse.ok) {
      const imageData = imageResponse.body

      res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400')
      res.status(Status.OK).send(imageData)

      return
    }
  }
}

const fallbackImages = async (keywords: string[]): Promise<string[]> => {
  const imageUrls = await fetchImagesFromUnsplash(keywords)

  if (imageUrls.length === 0) imageUrls.push(...(await fetchImagesFromSearch(keywords)))

  return imageUrls
}
