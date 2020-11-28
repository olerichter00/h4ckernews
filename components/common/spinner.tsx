import { useState, useEffect } from 'react'

export default function Spinner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 0)
  }, [])

  return (
    <div className={`duration-1000 animate-pulse ${show ? 'opacity-100' : 'opacity-0'}`}>
      <svg className="animate-spin h-8 w-8 mx-auto my-24" viewBox="0 0 24 24">
        <path
          className="opacity-100"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}
