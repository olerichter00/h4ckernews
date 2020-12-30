import { createServer } from 'vercel-node-server'
import listen from 'test-listen'
import imageLambda from '../../pages/api/image2'
import fetch from 'cross-fetch'

let server: any
let url = 'api/image2'

beforeAll(async () => {
  server = createServer(imageLambda)
  url = await listen(server)
})

afterAll(() => {
  server.close()
})

it('should return the expected response', async () => {
  const response = await fetch(url)

  expect(response.text()).toBe('Hello Pearl')
})
