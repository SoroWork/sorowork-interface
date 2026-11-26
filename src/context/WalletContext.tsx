import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface WalletState {
  address: string | null
  connected: boolean
  connecting: boolean
  network: 'testnet' | 'mainnet'
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    address: null,
    connected: false,
    connecting: false,
    network: 'testnet',
  })

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, connecting: true }))
    try {
      if (typeof window !== 'undefined' && (window as any).freighterApi) {
        const { requestAccess } = (window as any).freighterApi
        const address = await requestAccess()
        setState({ address, connected: true, connecting: false, network: 'testnet' })
      } else {
        throw new Error('Freighter wallet not found')
      }
    } catch {
      setState(prev => ({ ...prev, connecting: false }))
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({ address: null, connected: false, connecting: false, network: 'testnet' })
  }, [])

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}
