import { atom, selector } from 'recoil'

import config from '../config'

export type Type = 'top' | 'show' | 'ask'

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
  default: config.defaultStoriesType,
})

export const storyTypeState = selector({
  key: 'storyTypeState',
  get: ({ get }) => get(typeState),
  set: ({ set, get }, newValue) => {
    set(typeState, newValue)
    set(storyCountState, config.pageSize)
    set(forceUpdateState, get(forceUpdateState) + 1)
    set(storyCountState, config.pageSize)
  },
})

export const storyCountState = atom({
  key: 'storyCount',
  default: config.pageSize,
})

export const increaseStoryCountState = selector({
  key: 'increaseStoryCountState',
  get: () => {},
  set: ({ get, set }) => {
    const pageSize = get(filterState) ? config.filterPageSize : config.pageSize
    const newStoryCount = get(storyCountState) + pageSize

    history.replaceState({ count: newStoryCount }, '')

    set(storyCountState, newStoryCount)
  },
})

export const storiesState = selector({
  key: 'storiesState',
  get: async ({ get }): Promise<StoryType[]> => {
    if (!process.browser) return []

    get(forceUpdateState)

    const responses = await Promise.allSettled(
      [0, 1, 2, 4, 5, 6].map(async page => {
        const pageSize = 50

        const response = await fetch(
          `api/stories?type=${get(storyTypeState)}&pageSize=${pageSize}&page=${page}`,
        )

        if (Math.random() > 0.5) throw 'hello'

        return response.json()
      }),
    )

    return responses
      .filter(response => response.status === 'fulfilled')
      .map(response => response.status === 'fulfilled' && response.value.data)
      .flat()
  },
})
