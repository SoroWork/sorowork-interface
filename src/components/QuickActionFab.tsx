import { useState } from 'react'
import { Plus, X, Search, FileText, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const actions = [
  { icon: Search, label: 'Find Work', path: '/discover' },
  { icon: FileText, label: 'My Tasks', path: '/dashboard' },
  { icon: Users, label: 'Communities', path: '/communities' },
]

export function QuickActionFab() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden flex flex-col-reverse items-end gap-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-sorowork-blue text-white shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
        aria-label={open ? 'Close menu' : 'Quick actions'}
      >
        {open ? <X size={24} /> : <Plus size={24} />}
      </button>

      {open && actions.map((action) => (
        <button
          key={action.path}
          onClick={() => { navigate(action.path); setOpen(false) }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-sorowork-navy-card text-white shadow-md text-sm hover:bg-sorowork-navy-hover transition-colors"
        >
          <action.icon size={16} />
          {action.label}
        </button>
      ))}
    </div>
  )
}
