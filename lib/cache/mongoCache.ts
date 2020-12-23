import { Cache } from './cacheModel'

export const withCache = async <T>(
  key: string,
  getContent: Function,
  { maxAge = 0, staleWhileInvalidate = false } = {},
): Promise<T> => {
  const currentTime = new Date().getTime()

  const { content = undefined, updatedAt = 0 } = (await Cache.find({ key }))[0] || {}

  if (!content || currentTime - updatedAt > maxAge * 1000) return await set<T>(key, getContent)

  if (staleWhileInvalidate) set(key, getContent)

  return content
}

export const set = async <T>(key: string, getContent: Function): Promise<T> => {
  const updatedAt = new Date().getTime()
  const content = await getContent()

  await Cache.updateOne(
    { key },
    { content, updatedAt },
    { upsert: true, setDefaultsOnInsert: true },
  )

  return content
}
