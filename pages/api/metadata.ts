import { NowRequest, NowResponse } from '@vercel/node'

import scrape from 'html-metadata'

export const fetchMetadata = async url => {
  const metadata = await scrape(url)

  const imageUrl =
    metadata.openGraph &&
    metadata.openGraph.image &&
    metadata.openGraph.image.url

  const description =
    (metadata.openGraph && metadata.openGraph.description) ||
    (metadata.general && metadata.general.description) ||
    (metadata.general && metadata.general.title)

  return { imageUrl, description }
}

export default async (req: NowRequest, res: NowResponse) => {
  const { url } = req.query

  try {
    const metadata = await fetchMetadata(url)

    res.setHeader('Cache-Control', 's-maxage=86400')
    res.status(200).json(metadata)
  } catch (error) {
    res.status(404).json({})
  }
}
