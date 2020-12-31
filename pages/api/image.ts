import { NowRequest, NowResponse } from '@vercel/node'
import sharp from 'sharp'
import pageMetaScraper from '../../lib/metadataScraper'

export default async (req: NowRequest, res: NowResponse) => {
  const url = decodeURIComponent(String(req.query.url))
  const keywords = decodeURIComponent(String(req.query.keywords)).split(',')

  let image

  try {
    const response = await fetch(url)

    if (!response.ok) throw new Error("Coudln't load image")

    const contentType = response.headers.get('content-type')
    if (contentType) res.setHeader('content-type', contentType)

    image = await resizeImage(await response.arrayBuffer())
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
