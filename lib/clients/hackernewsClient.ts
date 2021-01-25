import { injectable } from 'inversify'
import config from 'lib/config'
import { StoryBase, StoryType } from 'lib/types'
@injectable()
class HackernewsClient {
  fetchStoryIds = async (type: StoryType): Promise<Array<string>> => {
    const res = await fetch(`${config.hackernewsBaseUrl}/${type}stories.json`)

    return await res.json()
  }

  fetchStory = async (id: string): Promise<StoryBase> => {
    const res = await fetch(`${config.hackernewsBaseUrl}/item/${id}.json`)

    return await res.json()
  }
}

export default HackernewsClient
