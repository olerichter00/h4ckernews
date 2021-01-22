import { NowRequest, NowResponse } from '@vercel/node'
import DIContainer from '../../lib/di-container'
import ImageResizer from '../../lib/services/imageResizer'
import MetadataScraper from '../../lib/services/metadataScraper'

export default async (req: NowRequest, res: NowResponse) => {
  const metadataScraper = DIContainer.resolve<MetadataScraper>(MetadataScraper)
  const imageResizer = DIContainer.resolve<ImageResizer>(ImageResizer)

  const url = decodeURIComponent(String(req.query.url))
  const keywords = decodeURIComponent(String(req.query.keywords)).split(',')

  let image: unknown

  try {
    const imageResponse = await fetch(url)

    if (!imageResponse.ok) throw new Error("Couldn't load image.")

    image = await imageResizer.resize(await imageResponse.arrayBuffer())

    res.setHeader('content-type', imageResponse.headers.get('content-type') || '')
  } catch (error) {
    const fallbackImage = await fetchFallbackImage(metadataScraper, keywords)

    if (fallbackImage) image = await imageResizer.resize(fallbackImage)
  }

  res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400')
  res.send(image)
}

const fetchFallbackImage = async (metadataScraper: MetadataScraper, keywords: string[]) => {
  for (const url of await metadataScraper.getFallbackImage(keywords)) {
    const imageResponse = await fetch(url)

    if (imageResponse.ok) {
      return imageResponse.arrayBuffer()
    }
  }
}
