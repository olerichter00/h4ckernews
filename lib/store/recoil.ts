import { atom, selector, selectorFamily, waitForNone } from 'recoil'
import { DEFAULT_STORIES_TYPE, fetchStories } from '../apiClient'

export const PAGE_SIZE = 15
export const FILTER_PAGE_SIZE = 30

export const forceUpdateState = atom({
  key: 'forceUpdateState',
  default: 0,
})

export const filterState = atom({
  key: 'filterType',
  default: false,
})

export const typeState = atom({
  key: 'typeType',
  default: DEFAULT_STORIES_TYPE,
})

export const storyTypeState = selector({
  key: 'storyTypeState',
  get: ({ get }) => get(typeState),
  set: ({ set, get }, newValue) => {
    set(typeState, newValue)
    set(forceUpdateState, get(forceUpdateState) + 1)
  },
})

export const storyIdsState = selector({
  key: 'storyIdsState',
  get: async ({ get }) => {
    get(forceUpdateState)
    return await fetchStories({ type: get(typeState) })
  },
})

export const storyCountState = atom({
  key: 'storyCount',
  default: PAGE_SIZE,
})

export const increaseStoryCountState = selector({
  key: 'increaseStoryCountState',
  get: () => {},
  set: ({ get, set }) => {
    const pageSize = get(filterState) ? FILTER_PAGE_SIZE : PAGE_SIZE
    const newStoryCount = get(storyCountState) + pageSize

    history.replaceState({ count: newStoryCount }, '')

    set(storyCountState, newStoryCount)
  },
})

export const storyQuery = selectorFamily({
  key: 'storyQuery',
  get: id => async () => {
    if (!id) return {}

    try {
      const response = await fetch(`/api/stories/${String(id)}`)

      if (response.ok) return await response.json()

      throw new Error()
    } catch {
      console.warn("Couldn't fetch story.")
      return {}
    }
  },
})

export const metadataQuery = selectorFamily({
  key: 'metadataQuery',
  get: id => async ({ get }) => {
    const { url, title } = get(await storyQuery(id))

    const itemUrl = `https://news.ycombinator.com/item?id=${id.toString()}`
    const storyUrl = String(url || itemUrl)

    if (!(storyUrl && title)) return {}

    const keywords = encodeURIComponent(title.split(' '))

    const response = await fetch(
      `/api/metadata?url=${encodeURIComponent(storyUrl)}&keywords=${keywords}`,
    )

    if (!response.ok) throw new Error('Failed to load metadata.')

    return await response.json()
  },
})

export const storiesState = selector({
  key: 'storiesState',
  get: ({ get }) => {
    if (!process.browser) return []

    const ids = get(storyIdsState).slice(0, get(storyCountState))
    const stories = get(waitForNone(ids.map(id => storyQuery(id))))

    return stories
  },
})
