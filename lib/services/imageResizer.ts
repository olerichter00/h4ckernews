import { injectable } from 'inversify'
import sharp from 'sharp'

@injectable()
class ImageResizer {
  public resize = async (imageArrayBuffer: ArrayBuffer) => {
    const imageBuffer = Buffer.from(await imageArrayBuffer)

    return sharp(imageBuffer).resize({ width: 500 })
  }
}

export default ImageResizer
