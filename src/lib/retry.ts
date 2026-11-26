interface RetryOptions {
  maxRetries?: number
  baseDelay?: number
  maxDelay?: number
}

export async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retryOptions?: RetryOptions,
): Promise<Response> {
  const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000 } = retryOptions || {}

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)
      if (response.ok || response.status < 500) return response
      lastError = new Error(`HTTP ${response.status}`)
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
    }

    if (attempt < maxRetries) {
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
      const jitter = delay * (0.5 + Math.random() * 0.5)
      await new Promise(r => setTimeout(r, jitter))
    }
  }

  throw lastError || new Error('Request failed after retries')
}
