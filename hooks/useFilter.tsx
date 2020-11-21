import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function useFilter(): [boolean, Function] {
  const [cookies, setCookies] = useCookies(['filter'])
  const [filter, setFilter] = useState<boolean>(false)

  useEffect(() => {
    const initialFilter = (cookies.filter === 'true' ? true : false) || false

    setFilter(initialFilter)
  })

  const switchFilter = () => {
    const newFilter = !filter

    setFilter(newFilter)
    setCookies('filter', newFilter)
  }

  return [filter, switchFilter]
}
