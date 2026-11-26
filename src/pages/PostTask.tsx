import { useState } from 'react'
import { ArrowLeft, MapPin, DollarSign, Tag, FileText, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TASK_CATEGORIES } from '../lib/constants'

export default function PostTask() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    reward: '',
    location: '',
    tags: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Will integrate with Soroban contract
    console.log('Post task:', form)
  }

  return (
    <div className="min-h-screen bg-sorowork-navy text-white">
      <div className="max-w-2xl mx-auto px-4 py-24">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="text-2xl font-bold mb-1">Post a Community Task</h1>
        <p className="text-white/40 text-sm mb-8">Create a task for local workers. Funds are locked in escrow until work is verified.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Task Title</label>
            <div className="relative">
              <FileText size={16} className="absolute left-3 top-3 text-white/30" />
              <input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g., Clean up Riverside Park trails"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-sorowork-purple/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe the work needed, any tools required, and expected outcomes..."
              rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-sorowork-purple/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-sorowork-purple/50 appearance-none"
              >
                <option value="">Select category</option>
                {TASK_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Reward (USDC)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-3 text-white/30" />
                <input
                  type="number"
                  value={form.reward}
                  onChange={e => setForm(f => ({ ...f, reward: e.target.value }))}
                  placeholder="50.00"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-sorowork-purple/50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3 text-white/30" />
              <input
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder="e.g., Riverside Park, 123 Main St"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-sorowork-purple/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1.5 block">Tags</label>
            <div className="relative">
              <Tag size={16} className="absolute left-3 top-3 text-white/30" />
              <input
                value={form.tags}
                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="e.g., park, cleanup, volunteers"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-sorowork-purple/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sorowork-purple to-sorowork-cyan rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Post Task & Lock Funds in Escrow
          </button>
        </form>
      </div>
    </div>
  )
}
