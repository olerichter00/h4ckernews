import getConfig from 'next/config'
import { StoryType } from './types'

type PublicConfig = {
  appUrl: string
  maxStories: number
  pageSize: number
  filterPageSize: number
  filterScoreThreshold: number
  filterCommentsThreshold: number
  loadMoreScrollOffset: number
  defaultStoriesType: StoryType
  breakpoints: {
    [key: string]: number
  }
}

type ServerConfig = {
  mongoUri: string
  hackernewsBaseUrl: string
  xRapidapiHost: string
  xRapidapiKey: string
  imageSearchBaseUrl: string
  unsplashBaseUrl: string
  unsplashClientId: string
  cutePandaImageUrl: string
  cuteKoalaImageUrl: string
  maxStories: number
}

export type Config = ServerConfig & PublicConfig

const nextConfig = getConfig() || {}

const config: Config = {
  ...nextConfig.publicRuntimeConfig,
  ...nextConfig.serverRuntimeConfig,
}

export default config
