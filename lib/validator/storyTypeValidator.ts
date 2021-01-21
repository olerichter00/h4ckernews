import { StoryType } from '../types'
import { STORY_TYPES } from '../utils/constants'

const validateType = (type: StoryType): boolean =>
  typeof type === 'string' && STORY_TYPES.includes(type)

export default validateType
