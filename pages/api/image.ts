import { NowRequest, NowResponse } from '@vercel/node'
import sharp from 'sharp'
import pageMetaScraper from '../../lib/services/metadataScraper'

export default async (req: NowRequest, res: NowResponse) => {
  const url = decodeURIComponent(String(req.query.url))
  const keywords = decodeURIComponent(String(req.query.keywords)).split(',')

  let image: unknown

  try {
    const imageResponse = await fetch(url)

    if (!imageResponse.ok) throw new Error("Couldn't load image.")

    image = await resizeImage(await imageResponse.arrayBuffer())

    res.setHeader('content-type', imageResponse.headers.get('content-type') || '')
  } catch (error) {
    const fallbackImage = await fetchFallbackImage(keywords)

    if (fallbackImage) image = await resizeImage(fallbackImage)
  }

  res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400')
  res.send(image)
}

const resizeImage = async (imageArrayBuffer: ArrayBuffer) => {
  const imageBuffer = Buffer.from(await imageArrayBuffer)

  return await sharp(imageBuffer).resize({ width: 500 })
}

const fetchFallbackImage = async (keywords: string[]) => {
  for (const url of await pageMetaScraper.fallbackImages(keywords)) {
    const imageResponse = await fetch(url)

    if (imageResponse.ok) {
      return imageResponse.arrayBuffer()
    }
  }
}
