import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, DollarSign, Calendar, User, ExternalLink, Send } from 'lucide-react'
import { useTask, useTaskSubmissions, useSubmitWork, useApproveSubmission } from '../hooks/useTasks'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { UserAvatar } from '../components/UserAvatar'
import { SubmissionCard } from '../components/SubmissionCard'
import { Input } from '../components/ui/Input'
import { formatAmount, formatDate } from '../lib/utils'
import { useWallet } from '../hooks/useWallet'

export function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: task, isLoading } = useTask(id!)
  const { data: submissions } = useTaskSubmissions(id!)
  const { mutate: submitWork, isPending: submitting } = useSubmitWork()
  const { mutate: approve } = useApproveSubmission()
  const { user, address } = useWallet()

  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [evidenceUrl, setEvidenceUrl] = useState('')
  const [description, setDescription] = useState('')

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-32 bg-white/10 rounded" />
        <div className="card p-6 space-y-4">
          <div className="h-6 bg-white/10 rounded w-2/3" />
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-5/6" />
        </div>
      </div>
    )
  }

  if (!task) return <div className="text-white/50 text-center py-16">Task not found</div>

  const isCreator = user?.id === task.creatorId
  const canSubmit = !isCreator && task.status === 'OPEN' || task.status === 'ASSIGNED'

  const handleSubmit = () => {
    if (!evidenceUrl) return
    submitWork({ taskId: task.id, evidenceUrl, description }, {
      onSuccess: () => {
        setShowSubmitForm(false)
        setEvidenceUrl('')
        setDescription('')
      },
    })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/discover" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
        <ArrowLeft size={16} />
        Back to Discover
      </Link>

      <div className="card p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold leading-tight">{task.title}</h1>
          <Badge variant="status" status={task.status} className="shrink-0">{task.status}</Badge>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1.5">
            <DollarSign size={14} className="text-sorowork-blue" />
            <span className="text-sorowork-blue font-semibold">{formatAmount(task.rewardAmount, task.token)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(task.createdAt)}
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} />
            {task.creator.username}
          </div>
        </div>

        <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{task.description}</p>

        <div className="flex flex-wrap gap-2">
          {task.tags.map((tag) => <Badge key={tag} variant="tag">{tag}</Badge>)}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          <UserAvatar user={task.creator} size="md" />
          <div>
            <p className="font-medium text-sm">{task.creator.username}</p>
            <p className="text-xs text-white/40">Task Creator</p>
          </div>
          {canSubmit && !showSubmitForm && (
            <div className="ml-auto">
              <Button variant="gradient" onClick={() => setShowSubmitForm(true)}>
                <Send size={16} />
                Submit Work
              </Button>
            </div>
          )}
        </div>
      </div>

      {showSubmitForm && (
        <div className="card p-5 space-y-4 border-sorowork-purple/30">
          <h3 className="font-semibold">Submit Your Work</h3>
          <div className="space-y-3">
            <Input
              label="Evidence URL"
              placeholder="Link to photos, video, or other proof of completed work"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm text-white/70">Description (optional)</label>
              <textarea
                className="input-field resize-none h-24"
                placeholder="Describe the work you completed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="gradient" onClick={handleSubmit} loading={submitting}>
              Submit
            </Button>
            <Button variant="secondary" onClick={() => setShowSubmitForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="font-semibold text-white/80">
          Submissions ({submissions?.length || 0})
        </h2>
        {submissions?.map((sub) => (
          <SubmissionCard
            key={sub.id}
            submission={sub}
            isCreator={isCreator}
            onApprove={(id) => approve(id)}
          />
        ))}
        {!submissions?.length && (
          <p className="text-white/40 text-sm py-6 text-center">No submissions yet</p>
        )}
      </div>
    </div>
  )
}
