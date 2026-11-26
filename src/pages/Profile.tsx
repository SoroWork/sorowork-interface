import { useState } from 'react'
import { User, Award, Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react'
import { truncateAddress } from '../lib/format'

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'completed' | 'active' | 'reputation'>('completed')

  return (
    <div className="min-h-screen bg-sorowork-navy text-white">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sorowork-purple to-sorowork-cyan flex items-center justify-center">
              <User size={32} />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Community Worker</h1>
              <p className="text-sm text-white/40 font-mono mt-1">
                {truncateAddress('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UVIIDHJ7L3SCAPTUQAH', 8)}
                <button className="ml-2 text-sorowork-cyan hover:text-sorowork-cyan/80">
                  <ExternalLink size={12} />
                </button>
              </p>
              <div className="flex gap-4 mt-3 text-xs text-white/50">
                <span className="flex items-center gap-1"><MapPin size={12} /> Local Area</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> Joined Nov 2026</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-white/40">Tasks Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-sorowork-cyan">2,450</p>
              <p className="text-xs text-white/40">USDC Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-sorowork-purple-light">87</p>
              <p className="text-xs text-white/40">Reputation</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-4 bg-white/5 p-1 rounded-lg">
          {(['completed', 'active', 'reputation'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm rounded-md transition-colors capitalize ${
                activeTab === tab ? 'bg-sorowork-purple text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {tab === 'completed' && <Briefcase size={14} className="inline mr-1.5" />}
              {tab === 'reputation' && <Award size={14} className="inline mr-1.5" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="card p-8 text-center text-white/30">
          <p>Connect your wallet to view your {activeTab} tasks</p>
        </div>
      </div>
    </div>
  )
}
