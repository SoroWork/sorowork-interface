import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSubmitWork } from '../hooks/useTasks'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function Submit() {
  const [searchParams] = useSearchParams()
  const taskId = searchParams.get('taskId') || ''
  const navigate = useNavigate()
  const { mutate, isPending } = useSubmitWork()

  const [evidenceUrl, setEvidenceUrl] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!evidenceUrl) {
      setError('Evidence URL is required')
      return
    }
    if (!taskId) {
      setError('No task selected')
      return
    }
    setError('')
    mutate({ taskId, evidenceUrl, description }, {
      onSuccess: () => navigate(`/tasks/${taskId}`),
      onError: (err: unknown) => {
        const e = err as { response?: { data?: { message?: string } } }
        setError(e?.response?.data?.message || 'Submission failed')
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Link to={taskId ? `/tasks/${taskId}` : '/discover'} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
        <ArrowLeft size={16} />
        Back
      </Link>

      <div>
        <h1 className="text-2xl font-bold gradient-text">Submit Work</h1>
        <p className="text-white/50 text-sm mt-1">Upload proof of your completed work and a description</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Evidence URL *"
            placeholder="Link to photos, video, or other proof of completed work"
            value={evidenceUrl}
            onChange={(e) => setEvidenceUrl(e.target.value)}
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white/70">Description</label>
            <textarea
              className="input-field resize-none h-32"
              placeholder="Describe the work you completed, conditions, any notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" variant="gradient" size="lg" loading={isPending} className="w-full">
            <Send size={16} />
            Submit Work
          </Button>
        </form>
      </Card>
    </div>
  )
}
