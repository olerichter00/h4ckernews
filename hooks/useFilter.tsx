import useLocalStorage from '@olerichter00/use-localstorage'

export default function useFilter(): [boolean, Function] {
  const [filter, setFilter] = useLocalStorage('filter', false)

  const switchFilter = () => {
    const newFilter = !filter

    setFilter(newFilter)
  }

  return [filter, switchFilter]
}
