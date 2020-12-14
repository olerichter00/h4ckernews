export type Cache<T> = {
  get: (key: string) => Promise<[T, number]>
  set: (key: string, content: T) => Promise<[T, number]>
}

const revalidateCache = async <T>(
  key: string,
  cache: Cache<T>,
  revalidate: Function,
): Promise<[any, number]> => {
  const revalidatedValue = await revalidate(key)

  if (!revalidatedValue) return [null, 0]
  const cacheResult = await cache.set(key, revalidatedValue)

  return cacheResult
}

const getFromCache = async <T>(
  key: string,
  cache: Cache<T>,
  revalidate: Function,
  { maxAge = 0, forceRevalidate = false } = {},
) => {
  const currentTime = new Date().getTime()

  const [storedContent, updatedAt] = await cache.get(key)

  if (forceRevalidate || !storedContent || currentTime - updatedAt > maxAge * 1000) {
    const [newContent, timestamp] = await revalidateCache(key, cache, revalidate)

    return { cache: 'MISS', timestamp, data: newContent }
  }

  revalidateCache(key, cache, revalidate)

  return { cache: 'HIT', timestamp: updatedAt, data: storedContent }
}

export default getFromCache
