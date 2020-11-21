import { atom, selector } from 'recoil'

import { PAGE_SIZE, FILTER_PAGE_SIZE, DEFAULT_STORIES_TYPE } from '../config'

export type StoryType = {
  title: string
  url: string
  score: number
  text: string
  id: string
  descendants: number
  description: string
  imageUrls: string[]
  favicon: string
}

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

export const storiesState = selector({
  key: 'storiesState',
  get: async ({ get }): Promise<{ value: StoryType }[]> => {
    if (!process.browser) return []

    get(forceUpdateState)

    const response = await fetch(`api/stories?type=${get(storyTypeState)}`)
    const story = await response.json()
    return story.data
  },
})
