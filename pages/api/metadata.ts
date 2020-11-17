import { NowRequest, NowResponse } from '@vercel/node'

import { scrape } from '../../lib/scraper/metadataScraper'
import { timeoutFetch } from '../../lib/utils'

export default async (req: NowRequest, res: NowResponse) => {
  const { url, keywords } = req.query

  try {
    const metadata = await scrape(url as string, keywords as string, timeoutFetch)

    res.setHeader('Cache-Control', 's-maxage=86400')
    res.status(200).json(metadata)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
