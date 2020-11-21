import config from './config'

export const fetchStories = async ({ type = config.defaultStoriesType } = {}): Promise<
  Array<any>
> => {
  const res = await fetch(`${config.hackernewsBaseUrl}/${type}stories.json`)

  return await res.json()
}

export const fetchStory = async (id: string): Promise<any> => {
  const res = await fetch(`${config.hackernewsBaseUrl}/item/${id}.json`)

  return await res.json()
}
