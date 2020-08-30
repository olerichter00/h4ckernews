import { atom, selector, selectorFamily, waitForNone } from 'recoil'

const PAGE_SIZE = 10

export const allStoryIdsState = atom({
  key: 'storyIds',
  default: [],
})

export const storyCountState = atom({
  key: 'storyCount',
  default: PAGE_SIZE,
})

export const increaseStoryCountState = selector({
  key: 'increaseStoryCountState',
  set: ({ get, set }) => {
    const prevStoryCount = get(storyCountState)
    set(storyCountState, prevStoryCount + PAGE_SIZE)
  },
  get: () => {},
})

export const storyIdsState = selector({
  key: 'currentStoryIds',
  get: ({ get }) => {
    return get(allStoryIdsState).slice(0, get(storyCountState))
  },
})

export const storyQuery = selectorFamily({
  key: 'storyQuery',
  get: id => async () => {
    if (!id) return {}

    try {
      const response = await fetch(`/api/story?id=${String(id)}`)

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
  get: url => async () => {
    if (!url) return {}

    try {
      const response = await fetch(
        `/api/metadata?url=${encodeURIComponent(String(url))}`,
      )

      if (response.ok) return await response.json()

      throw new Error()
    } catch {
      console.warn(`Couldn't fetch metadata for ${String(url)}.`)
      return {}
    }
  },
})

export const storiesState = selector({
  key: 'storiesState',
  get: ({ get }) => {
    if (!process.browser) return []

    const ids = get(storyIdsState)
    const stories = get(waitForNone(ids.map(id => storyQuery(id))))

    return stories
  },
})
