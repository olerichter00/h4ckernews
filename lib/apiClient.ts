import config from './config'

export const fetchStoryIds = async ({ type = config.defaultStoriesType } = {}): Promise<
  Array<any>
> => {
  const res = await fetch(`${config.hackernewsBaseUrl}/${type}stories.json`)

  return await res.json()
}

export const fetchStory = async (id: string, fetcher: Function = fetch): Promise<any> => {
  const res = await fetcher(`${config.hackernewsBaseUrl}/item/${id}.json`)

  return await res.json()
}
