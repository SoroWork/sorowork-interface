import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-sorowork-navy flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-sorowork-purple mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-white/40 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Go back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2.5 bg-sorowork-purple rounded-lg hover:bg-sorowork-purple/80 transition-colors text-sm font-medium"
          >
            <Home size={16} /> Home
          </button>
        </div>
      </div>
    </div>
  )
}
