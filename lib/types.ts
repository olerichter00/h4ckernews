export type StoryBase = {
  title: string
  url: string
  score: number
  text: string
  id: string
  descendants: number
  time: number
}

export type StoryMetadata = {
  title?: string
  description?: string
  favicon?: string
  imageUrls?: string[]
}

export type Story = StoryBase & StoryMetadata

export type StoryType = 'top' | 'show' | 'ask'

export type ColorScheme = 'dark' | 'light'
