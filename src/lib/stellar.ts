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
  return await freighter.getPublicKey()
}

export async function signMessage(message: string): Promise<string> {
  const encoded = btoa(message)
  return await freighter.signBlob(encoded)
}

export async function getNetwork(): Promise<string> {
  return await freighter.getNetwork()
}

export async function getPublicKey(): Promise<string | null> {
  try {
    return await freighter.getPublicKey()
  } catch {
    return null
  }
}
