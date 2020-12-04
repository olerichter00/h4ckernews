import { useState, useEffect, Dispatch } from 'react'

export default function useLocalStorage(
  key: string,
  initialValue: any | Function,
): [any, Dispatch<any>] {
  const [storedValue, setStoredValue] = useState()

  const handleItemUpdate = (event: StorageEvent) => {
    if (key !== event.key) return

    const item = window.localStorage.getItem(key)

    setStoredValue(item ? JSON.parse(item) : initialItem())
  }

  const initialItem = () => (initialValue instanceof Function ? initialValue() : initialValue)

  useEffect(() => {
    window.addEventListener('storage', handleItemUpdate)

    const item = window.localStorage.getItem(key)

    setStoredValue(item ? JSON.parse(item) : initialItem())

    return () => window.removeEventListener('storage', handleItemUpdate)
  }, [])

  const setValue = (newValue: any) => {
    const valueToStore = newValue instanceof Function ? newValue() : newValue

    storeItem(valueToStore)
    setStoredValue(valueToStore)
  }

  const storeItem = (item: any) => {
    window.localStorage.setItem(key, JSON.stringify(item))

    const event = new StorageEvent('storage', { key: key })
    window.dispatchEvent(event)
  }

  return [storedValue, setValue]
}
