import { useState, useEffect } from 'react'

const GRADIENT_FROM = [
  'from-red-500',
  'from-blue-500',
  'from-orange-500',
  'from-yellow-500',
  'from-teal-500',
  'from-purple-500',
  'from-green-500',
]
const GRADIENT_TO = [
  'to-red-500',
  'to-blue-700',
  'to-orange-500',
  'to-yellow-500',
  'to-teal-700',
  'to-purple-700',
  'to-green-700',
]
type FallbackImageProps = {
  placeholderText: string
}

export default function FallbackImage({ placeholderText }: FallbackImageProps) {
  return (
    <div
      className={`bg-gray-900 h-full p-1 text-white font-semibold `}
      style={{ fontSize: `2rem`, lineHeight: 1, paddingTop: '5px' }}
    >
      {placeholderText}
    </div>
  )
}
