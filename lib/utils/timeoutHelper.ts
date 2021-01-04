export const asyncTimeout = (timeout: number) => new Promise(reject => setTimeout(reject, timeout))

export const timeoutFetch = async (
  url: RequestInfo,
  options: (RequestInit | undefined) & { timeout: number } = { timeout: 8000 },
) => {
  const { timeout } = options

  const response = (await Promise.race([fetch(url, options), asyncTimeout(timeout)])) as Response

  return response
}

export const createTimeoutFetch = (timeout: number) => (
  url: RequestInfo,
  options: (RequestInit | undefined) & { timeout: number },
) => timeoutFetch(url, { ...options, timeout })
