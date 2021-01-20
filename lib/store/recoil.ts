import { atom, selector } from 'recoil'

import config from '../config'
import { Story } from '../types'

export type Type = 'top' | 'show' | 'ask'

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
  get: async ({ get }): Promise<Story[]> => {
    if (!process.browser) return []

    get(forceUpdateState)

    const response = await fetch(`api/stories/${get(storyTypeState)}`)
    const stories = await response.json()

    return stories.data
  },
})

export const filteredStoriesState = selector({
  key: 'filteredStoriesState',
  get: async ({ get }): Promise<Story[]> => {
    const filter = get(filterState)
    let stories = await get(storiesState)

    if (filter) stories = filterStories(stories)

    return stories
  },
})

const filterStories = (stories: Story[]): Story[] =>
  stories.filter(
    story =>
      story &&
      (story.score >= config.filterScoreThreshold ||
        (story.descendants && story.descendants >= config.filterCommentsThreshold)),
  )
