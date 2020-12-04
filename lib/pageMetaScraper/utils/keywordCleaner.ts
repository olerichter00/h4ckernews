import { stripFilenameFromUrl } from './helper'

const EXCLUDE_KEYWORDS = [
  'ask',
  'show',
  'hn',
  'the',
  'a',
  'that',
  'this',
  'as',
  'and',
  'or',
  'for',
  'in',
  'out',
  'new',
  'i',
]

const cleanKeywords = (keywords: string[]): string[] =>
  keywords
    .map(keyword => keyword.replace(/[^A-Za-z\s]/g, '').replace(/\s{2,}/g, ' '))
    .filter(keyword => keyword.length >= 4)
    .filter(keyword => !EXCLUDE_KEYWORDS.includes(keyword.toLowerCase()))

export default cleanKeywords
