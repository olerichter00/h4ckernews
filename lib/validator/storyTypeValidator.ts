const validateType = (type: unknown): boolean =>
  typeof type === 'string' && ['top', 'show', 'ask'].includes(type)

export default validateType
