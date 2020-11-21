import React from 'react'
import Truncate from 'react-truncate'

type FallbackImageProps = {
  placeholderText: string
}

export default function FallbackImage({ placeholderText }: FallbackImageProps) {
  return (
    <div className="flex flex-col h-40 p-4 bg-gray-800">
      <div className={`text-white font-semibold my-auto text-lg leading-5`}>
        <Truncate lines={4}>{placeholderText.toUpperCase()}</Truncate>
      </div>
    </div>
  )
}
