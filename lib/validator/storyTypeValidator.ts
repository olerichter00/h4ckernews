import config from '../config'

const validateType = (type: unknown): boolean =>
  typeof type === 'string' && config.storyTypes.includes(type)

export default validateType
