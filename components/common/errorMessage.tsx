import React, { useState, useEffect } from 'react'

const ErrorMessage: React.FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 0)
  }, [])

  return (
    <div className={`flex flex-col my-12 w-full ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mx-auto">Oops. Something went wrong...</div>
      <button
        className="dark:hover:text-gray-300 hover:text-700 m-4 mx-auto text-primary outline-none"
        onClick={() => window.location.reload()}
      >
        <svg
          className="w-10 h-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  )
}

export default ErrorMessage
