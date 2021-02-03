import { injectable } from 'inversify'
import sharp from 'sharp'

@injectable()
class ImageService {
  public resize = async (imageArrayBuffer: ArrayBuffer): Promise<sharp.Sharp> => {
    const imageBuffer = Buffer.from(await imageArrayBuffer)

    return sharp(imageBuffer).resize({ width: 500 })
  }
}

export default ImageService
