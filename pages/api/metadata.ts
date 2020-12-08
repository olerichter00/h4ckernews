import Status from 'http-status-codes'
import { NowRequest, NowResponse } from '@vercel/node'

import metadataScraper from '../../lib/metadataScraper'
import { createTimeoutFetch } from '../../lib/utils/timeoutFetch'

export default async (req: NowRequest, res: NowResponse) => {
  const { url, keywords } = req.query

  try {
    const metadata = await metadataScraper.scrape(
      url as string,
      (keywords as string).split(','),
      createTimeoutFetch(1000),
    )

    res.setHeader('Cache-Control', 's-maxage=86400')
    res.status(Status.OK).json(metadata)
  } catch (error) {
    res.status(Status.NOT_FOUND).json({
      error: error.message,
    })
  }
}
