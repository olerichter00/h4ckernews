import useLocalStorage from '@olerichter00/use-localstorage'

const useFilter = (): [boolean, Function] => {
  const [filter, setFilter] = useLocalStorage<boolean>('filter', false)

  const switchFilter = () => {
    const newFilter = !filter

    setFilter(newFilter)
  }

  return [filter as boolean, switchFilter]
}

export default useFilter
