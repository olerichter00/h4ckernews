import { NowRequest, NowResponse } from '@vercel/node'

import { scrape } from '../../lib/scraper/metadataScraper'

export default async (req: NowRequest, res: NowResponse) => {
  const { url, keywords } = req.query

  try {
    const metadata = await scrape(url, keywords)

    res.setHeader('Cache-Control', 's-maxage=86400')
    res.status(200).json(metadata)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
