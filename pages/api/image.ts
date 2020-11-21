import { NowRequest, NowResponse } from '@vercel/node'

import { timeoutFetch } from '../../lib/utils'

export default async (req: NowRequest, res: NowResponse) => {
  const urls = decodeURIComponent(String(req.query.urls)).split(',')

  await Promise.all(
    urls.map(async url => {
      try {
        const imageResponse = await timeoutFetch(url, 1000)

        if (!imageResponse.ok) return

        const imageData = imageResponse.body

        res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=86400')
        res.status(200).send(imageData)
      } catch {}
    }),
  )
}
