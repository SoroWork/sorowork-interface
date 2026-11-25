import { Wallet, LogOut, ChevronDown } from 'lucide-react'
import { Button } from './ui/Button'
import { truncateAddress } from '../lib/utils'
import { useWallet } from '../hooks/useWallet'

export function WalletButton() {
  const { address, isConnected, isConnecting, hasFreighter, connect, disconnect } = useWallet()

  if (!hasFreighter) {
    return (
      <a
        href="https://www.freighter.app"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-sm flex items-center gap-2"
      >
        <Wallet size={16} />
        Install Freighter
      </a>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-sorowork-navy-card border border-white/10 rounded-lg px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm text-white/80 font-mono">{truncateAddress(address)}</span>
          <ChevronDown size={14} className="text-white/40" />
        </div>
        <Button variant="ghost" size="sm" onClick={disconnect} title="Disconnect wallet">
          <LogOut size={15} />
        </Button>
      </div>
    )
  }

  return (
    <Button variant="gradient" size="md" onClick={connect} loading={isConnecting}>
      <Wallet size={16} />
      Connect Wallet
    </Button>
  )
}
