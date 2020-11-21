import { DEFAULT_STORIES_TYPE, HACKERNEWS_BASE_URL } from './config'

export const fetchStories = async ({ type = DEFAULT_STORIES_TYPE } = {}): Promise<Array<any>> => {
  const res = await fetch(`${HACKERNEWS_BASE_URL}/${type}stories.json`)

  return await res.json()
}

export const fetchStory = async (id: string): Promise<any> => {
  const res = await fetch(`${HACKERNEWS_BASE_URL}/item/${id}.json`)

  return await res.json()
}
