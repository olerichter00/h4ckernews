import httpMocks from 'node-mocks-http'
import { StoryType } from '../../../lib/types'
import { STORY_TYPES } from '../../../lib/utils/constants'
import getStories from '../../../pages/api/stories/[type]/index'

describe('/api/stories/[type]', () => {
  STORY_TYPES.forEach((type: StoryType) => {
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
  httpMocks.createMocks({
    method: 'GET',
    query: {
      type: type,
    },
  })
