export const asyncTimeout = (timeout: number) => new Promise(reject => setTimeout(reject, timeout))

export const timeoutFetch = async (
  url: RequestInfo,
  options: (RequestInit | undefined) & { timeout: number } = { timeout: 8000 },
) => {
  const { timeout } = options

  const response = (await Promise.race([fetch(url), asyncTimeout(timeout)])) as Response

  return response
}

export const withTimeout = (promises: Promise<any>[], timeout: number) => {
  const timer = asyncTimeout(timeout)

  return Promise.race([Promise.allSettled(promises), timer])
}

export const createTimeoutFetch = (timeout: number) => (
  url: RequestInfo,
  options: (RequestInit | undefined) & { timeout: number },
) => timeoutFetch(url, { ...options, timeout })
