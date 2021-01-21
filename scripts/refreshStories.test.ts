import config from '../lib/config'
import updateStories from '../lib/services/updateStories'
import { StoryType } from '../lib/types'

test('updates stories', async () => {
  await Promise.allSettled(config.storyTypes.map((type: StoryType) => updateStories(type)))
})
