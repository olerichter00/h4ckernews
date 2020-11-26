import { NowRequest, NowResponse } from '@vercel/node'

import metadataScraper from '../../lib/pageMetaScraper/metadataScraper'
import { timeoutFetch } from '../../lib/utils'

export default async (req: NowRequest, res: NowResponse) => {
  const { url, keywords } = req.query

  try {
    const metadata = await metadataScraper(
      url as string,
      (keywords as string).split(','),
      timeoutFetch,
    )

    res.setHeader('Cache-Control', 's-maxage=86400')
    res.status(200).json(metadata)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}
