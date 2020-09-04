const hackernewsBaseUrl = 'https://hacker-news.firebaseio.com/v0'

export const DEFAULT_STORIES_TYPE = 'top'

export const fetchStories = async ({ type = DEFAULT_STORIES_TYPE } = {}): Promise<any> => {
  const res = await fetch(`${hackernewsBaseUrl}/${type}stories.json`)

  return await res.json()
}

export const fetchStory = async (id: string): Promise<any> => {
  const res = await fetch(`${hackernewsBaseUrl}/item/${id}.json`)

  return await res.json()
}
