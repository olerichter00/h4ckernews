import { Cache } from './cacheModel'

export const withCache = async <T>(
  key: string,
  getContent: Function,
  { maxAge = 0, staleWhileRevalidate = false, validator = (content: any) => !!content } = {},
): Promise<T> => {
  const currentTime = new Date().getTime()

  let cacheContent

  try {
    cacheContent = (await Cache.find({ key }))[0]
  } catch {
    console.error('Loading from cache failed.')
  }

  const { content = undefined, updatedAt = 0 } = cacheContent || {}

  if (
    currentTime - updatedAt > maxAge * 1000 ||
    !validator(content) ||
    (content.length && content.length === 0)
  )
    return await set<T>(key, getContent)

  if (staleWhileRevalidate) set(key, getContent)

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
