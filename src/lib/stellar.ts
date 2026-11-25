import freighter from '@stellar/freighter-api'

export async function isFreighterInstalled(): Promise<boolean> {
  try {
    return await freighter.isConnected()
  } catch {
    return false
  }
}

export async function connectWallet(): Promise<string> {
  if (!(await freighter.isConnected())) {
    throw new Error('Freighter not installed. Please install the Freighter browser extension.')
  }
  const result = await freighter.getAddress()
  if ('error' in result) throw new Error(result.error)
  return result.address
}

export async function signMessage(message: string): Promise<string> {
  const result = await freighter.signMessage(message, {
    networkPassphrase: 'Test SDF Network ; September 2015',
  })
  if ('error' in result) throw new Error(result.error)
  return result.signedMessage
}

export async function getNetwork(): Promise<string> {
  const result = await freighter.getNetwork()
  if ('error' in result) throw new Error(result.error)
  return result.network
}

export async function getPublicKey(): Promise<string | null> {
  try {
    const result = await freighter.getAddress()
    if ('error' in result) return null
    return result.address
  } catch {
    return null
  }
}
