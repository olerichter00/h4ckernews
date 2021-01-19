import config from '../config'
import { StoryBase, StoryType } from '../types'

export const fetchStoryIds = async (type: StoryType): Promise<Array<string>> => {
  const res = await fetch(`${config.hackernewsBaseUrl}/${type}stories.json`)

  return await res.json()
}

export const fetchStory = async (id: string): Promise<StoryBase> => {
  const res = await fetch(`${config.hackernewsBaseUrl}/item/${id}.json`)

  return await res.json()
}
