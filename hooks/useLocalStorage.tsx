import { useState, useEffect, useCallback } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | Function,
): [any, Function] {
  const [storedValue, setStoredValue] = useState()

  const handleUpdateItem = useCallback((e: StorageEvent) => {
    if (key !== e.key) return

    const item = window.localStorage.getItem(key)

    setStoredValue(item ? JSON.parse(item) : undefined)
  }, [])

  useEffect(() => {
    window.addEventListener('storage', handleUpdateItem)

    try {
      const item = window.localStorage.getItem(key)

      setStoredValue(
        item ? JSON.parse(item) : initialValue instanceof Function ? initialValue() : initialValue,
      )
    } catch (error) {
      // console.error(error)

      setStoredValue(initialValue instanceof Function ? initialValue() : initialValue)
    }

    return () => window.removeEventListener('storage', handleUpdateItem)
  }, [handleUpdateItem])

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      storeItem(valueToStore)
    } catch (error) {
      // console.error(error)
    }
  }

  const storeItem = (item: T) => {
    window.localStorage.setItem(key, JSON.stringify(item))

    const event = new StorageEvent('storage', { key: key })
    window.dispatchEvent(event)
  }

  return [storedValue, setValue]
}
