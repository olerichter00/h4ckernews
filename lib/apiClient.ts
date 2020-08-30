const hackernewsBaseUrl = 'https://hacker-news.firebaseio.com/v0'

export const fetchTopStories = async (): Promise<any> => {
  const res = await fetch(`${hackernewsBaseUrl}/topstories.json`)

  return await res.json()
}

export const fetchStory = async (id: string): Promise<any> => {
  const res = await fetch(`${hackernewsBaseUrl}/item/${id}.json`)

  return await res.json()
}
