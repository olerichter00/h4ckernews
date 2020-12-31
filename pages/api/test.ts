import { NowRequest, NowResponse } from '@vercel/node'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('Cache-Control', 'public, s-max-age=0, stale-while-revalidate')
  res.send(new Date())
}
