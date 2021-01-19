const validateType = (type: any): boolean =>
  typeof type === 'string' && ['top', 'show', 'ask'].includes(type)

export default validateType
