import { createMocks } from 'node-mocks-http'
import getStories from '../../pages/api/stories/[type]/index'

const TYPES = ['top', 'show', 'ask']

describe('/api/stories/[type]', () => {
  TYPES.forEach(type => {
    test('returns stories', async () => {
      const { req, res } = buildMocks(type)

      await getStories(req, res)

      expect(res._getStatusCode()).toBe(200)

      const data = JSON.parse(res._getData()).data

      expect(data.length).toBeGreaterThan(50)
    })
  })

  describe('with unkown type', () => {
    test('returns error', async () => {
      const { req, res } = buildMocks('unkown')

      await getStories(req, res)

      expect(res._getStatusCode()).toBe(400)
    })
  })
})

const buildMocks = (type: string) =>
  createMocks({
    method: 'GET',
    query: {
      type: type,
    },
  })
