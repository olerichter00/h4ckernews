import React, { useState, useEffect } from 'react'

const Spinner: React.FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 0)
  }, [])

  return (
    <div className={`duration-1000 animate-pulse ${show ? 'opacity-100' : 'opacity-0'}`}>
      <svg className="mx-auto my-24 w-8 h-8 animate-spin" viewBox="0 0 24 24">
        <path
          className="opacity-100"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}

export default Spinner
