import useLocalStorage from './useLocalStorage'

export default function useFilter(): [boolean, Function] {
  const [filter, setFilter] = useLocalStorage<boolean>('filter', false)

  const switchFilter = () => {
    const newFilter = !filter

    setFilter(newFilter)
  }

  return [filter, switchFilter]
}
