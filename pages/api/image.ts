import { NowRequest, NowResponse } from '@vercel/node'
import DIContainer from '../../lib/di-container'
import ImageService from '../../lib/services/imageService'
import MetadataService from '../../lib/services/metadataService'

export default async (req: NowRequest, res: NowResponse) => {
  const metadataService = DIContainer.resolve<MetadataService>(MetadataService)
  const imageService = DIContainer.resolve<ImageService>(ImageService)

  const url = decodeURIComponent(String(req.query.url))
  const keywords = decodeURIComponent(String(req.query.keywords)).split(',')

  let image: unknown

  try {
    const imageResponse = await fetch(url)

    if (!imageResponse.ok) throw new Error("Couldn't load image.")

    image = await imageService.resize(await imageResponse.arrayBuffer())

    res.setHeader('content-type', imageResponse.headers.get('content-type') || '')
  } catch (error) {
    const fallbackImage = await fetchFallbackImage(metadataService, keywords)

    if (fallbackImage) image = await imageService.resize(fallbackImage)
  }

  res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400')
  res.send(image)
}

const fetchFallbackImage = async (metadataService: MetadataService, keywords: string[]) => {
  for (const url of await metadataService.getFallbackImage(keywords)) {
    const imageResponse = await fetch(url)

    if (imageResponse.ok) {
      return imageResponse.arrayBuffer()
    }
  }
}
