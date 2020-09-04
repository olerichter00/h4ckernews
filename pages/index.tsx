import { useEffect } from 'react'

import App from '../components/app'
import { fetchStories } from '../lib/apiClient'
import { useSetRecoilState } from 'recoil'
import { allStoryIdsState } from '../lib/store/recoil'

type HomeProps = {
  ids: string[]
  loadingError: boolean
}

export default function Home({ ids, loadingError }: HomeProps) {
  const setStoryIds = useSetRecoilState(allStoryIdsState)

  useEffect(() => {
    setStoryIds(ids)
  }, [ids])

  return (
    <main className="max-w-3xl pt-2 m-auto">
      {loadingError ? <div className="m-2">:(</div> : <App />}
    </main>
  )
}

export async function getServerSideProps() {
  let ids = []
  let loadingError = false
  try {
    ids = await fetchStories()
  } catch {
    loadingError = true
  }

  return {
    props: { ids, loadingError },
  }
}
