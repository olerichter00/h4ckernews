import { NowRequest, NowResponse } from '@vercel/node'

import { scrape } from '../../lib/metadataScraper'

export default async (req: NowRequest, res: NowResponse) => {
  const { url } = req.query

  try {
    const metadata = await scrape(url)

    res.setHeader('Cache-Control', 's-maxage=86400')
    res.status(200).json(metadata)
  } catch (error) {
    res.status(404).json({})
  }
}
