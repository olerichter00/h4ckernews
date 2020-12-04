const baseUrl = (host: string | undefined) =>
  `${process.env.NODE_ENV === 'development' ? 'http' : 'https'}://${host}/api`

export default baseUrl
