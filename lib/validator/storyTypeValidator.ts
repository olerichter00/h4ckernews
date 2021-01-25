import { StoryType } from 'lib/types'
import { STORY_TYPES } from 'lib/utils/constants'

const validateType = (type: StoryType): boolean =>
  typeof type === 'string' && STORY_TYPES.includes(type)

export default validateType
