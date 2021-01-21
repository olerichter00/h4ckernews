import httpMocks from 'node-mocks-http'
import refreshStories from '../../../pages/api/stories/[type]/refresh'

describe('/api/stories/[type]/refresh', () => {
  describe('with unkown type', () => {
    test('returns error', async () => {
      const { req, res } = buildMocks('unknown')

      await refreshStories(req, res)

      expect(res._getStatusCode()).toBe(400)
    })
  })
})

const buildMocks = (type: string) =>
  httpMocks.createMocks({
    method: 'GET',
    query: {
      type: type,
    },
  })
