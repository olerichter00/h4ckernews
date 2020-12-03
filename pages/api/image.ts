import { NowRequest, NowResponse } from '@vercel/node'
import fetchImagesFromSearch from '../../lib/pageMetaScraper/clients/imageSearchApiClient'
import fetchImagesFromUnsplash from '../../lib/pageMetaScraper/clients/unsplashSearchApiClient'

import { timeoutFetch } from '../../lib/utils/timeoutFetch'

export default async (req: NowRequest, res: NowResponse) => {
  const keywords = decodeURIComponent(String(req.query.keywords)).split(',')

  for (const url of await fallbackImages(keywords)) {
    const imageResponse = await timeoutFetch(url)

    if (imageResponse.ok) {
      const imageData = imageResponse.body

      res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400')
      res.status(200).send(imageData)

      return
    }
  }
}

const fallbackImages = async (keywords: string[]): Promise<string[]> => {
  let imageUrls = await fetchImagesFromUnsplash(keywords)

  if (imageUrls.length === 0) imageUrls.push(...(await fetchImagesFromSearch(keywords)))

  return imageUrls
}
