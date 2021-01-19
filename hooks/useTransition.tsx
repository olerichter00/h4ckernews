import { useEffect, useMemo, useState } from 'react'
import { Loadable } from 'recoil'

function useTransition<T>(
  loadable: Loadable<T>,
  forceRefresh?: any,
): [T | never[], boolean, boolean, number] {
  const [refreshkey, setRefreshKey] = useState(0)
  const [loading, setLoading] = useState(true)
  const [longLoading, setLongLoading] = useState(false)
  const [longLoadingTimeout, setLongLoadingTimeout] = useState<any>(undefined)

  useEffect(() => {
    setLoading(true)
    if (loadable.state !== 'loading') setTimeout(() => setLoading(false), 100)

    clearTimeout(longLoadingTimeout)
    setLongLoading(false)

    if (loadable.state === 'loading') {
      setLongLoadingTimeout(setTimeout(() => setLongLoading(true), 500))
    }
  }, [loadable.state])

  useEffect(() => {
    if (loadable.state !== 'loading') {
      setRefreshKey(refreshkey + 1)
    }
  }, [loadable.state, forceRefresh])

  const content = useMemo(() => (loadable.state === 'hasValue' ? loadable.contents : []), [
    refreshkey,
  ])

  return [content, loading, longLoading, refreshkey]
}

export default useTransition
