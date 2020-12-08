import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'
import pageMetaScraper from '../../lib/metadataScraper'

export default async (req: NowRequest, res: NowResponse) => {
  const keywords = decodeURIComponent(String(req.query.keywords)).split(',')

  for (const url of await pageMetaScraper.fallbackImages(keywords)) {
    const imageResponse = await fetch(url)

    if (imageResponse.ok) {
      const imageData = imageResponse.body

      res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400')
      res.status(Status.OK).send(imageData)

      return
    }
  }
}
