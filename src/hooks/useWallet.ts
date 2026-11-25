import { useState, useEffect, useCallback } from 'react'
import { connectWallet, getPublicKey, isFreighterInstalled } from '../lib/stellar'
import { authApi } from '../lib/api'
import type { User } from '../types'

interface WalletState {
  address: string | null
  user: User | null
  isConnected: boolean
  isConnecting: boolean
  hasFreighter: boolean
  error: string | null
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: localStorage.getItem('sorowork_wallet'),
    user: null,
    isConnected: false,
    isConnecting: false,
    hasFreighter: false,
    error: null,
  })

  useEffect(() => {
    isFreighterInstalled().then((has) => {
      setState((s) => ({ ...s, hasFreighter: has }))
    })

    const savedWallet = localStorage.getItem('sorowork_wallet')
    const savedToken = localStorage.getItem('sorowork_token')
    if (savedWallet && savedToken) {
      authApi.me().then((res) => {
        setState((s) => ({ ...s, address: savedWallet, user: res.data, isConnected: true }))
      }).catch(() => {
        localStorage.removeItem('sorowork_wallet')
        localStorage.removeItem('sorowork_token')
      })
    }
  }, [])

  const connect = useCallback(async () => {
    setState((s) => ({ ...s, isConnecting: true, error: null }))
    try {
      const address = await connectWallet()
      const message = `SoroWork login: ${Date.now()}`
      const { signMessage } = await import('../lib/stellar')
      const signature = await signMessage(message)

      let token: string
      let user: User
      try {
        const res = await authApi.login({ walletAddress: address, signature })
        token = res.data.token
        user = res.data.user
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status?: number } }
        if (axiosErr?.response?.status === 404) {
          const username = `user_${address.slice(0, 8).toLowerCase()}`
          const res = await authApi.register({ walletAddress: address, username, signature })
          token = res.data.token
          user = res.data.user
        } else {
          throw err
        }
      }

      localStorage.setItem('sorowork_wallet', address)
      localStorage.setItem('sorowork_token', token)
      setState((s) => ({ ...s, address, user, isConnected: true, isConnecting: false }))
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Failed to connect wallet'
      setState((s) => ({ ...s, error, isConnecting: false }))
    }
  }, [])

  const disconnect = useCallback(() => {
    localStorage.removeItem('sorowork_wallet')
    localStorage.removeItem('sorowork_token')
    setState({ address: null, user: null, isConnected: false, isConnecting: false, hasFreighter: state.hasFreighter, error: null })
  }, [state.hasFreighter])

  return { ...state, connect, disconnect }
}
