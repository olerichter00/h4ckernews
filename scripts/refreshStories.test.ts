import updateStories from '../lib/services/updateStories'
import { StoryType } from '../lib/types'

const types = ['top', 'show', 'ask']

test('updates stories', async () => {
  await Promise.allSettled(types.map(type => updateStories(type as StoryType)))
})
