import { useState, useEffect } from 'react'

import useFilter from '../../hooks/useFilter'

export default function NoStories() {
  const [show, setShow] = useState(false)
  const [filter, switchFilter] = useFilter()

  useEffect(() => {
    setTimeout(() => setShow(true), 0)
  }, [])

  return (
    <div className={`flex flex-col my-12 w-full ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mx-auto">Nothing to show...</div>
      {filter && (
        <button
          className="text-primary-600 hover:text-primary-500 mx-auto m-4 outline-none"
          onClick={() => switchFilter()}
        >
          Reset Filter
        </button>
      )}
    </div>
  )
}