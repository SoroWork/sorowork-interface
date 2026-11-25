import { ExternalLink, CheckCircle, XCircle } from 'lucide-react'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { UserAvatar } from './UserAvatar'
import { Button } from './ui/Button'
import { formatRelativeTime } from '../lib/utils'
import type { Submission } from '../types'

interface SubmissionCardProps {
  submission: Submission
  isCreator?: boolean
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

export function SubmissionCard({ submission, isCreator, onApprove, onReject }: SubmissionCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar user={submission.contributor} size="sm" />
          <div>
            <p className="text-sm font-medium">{submission.contributor.username}</p>
            <p className="text-xs text-white/40">{formatRelativeTime(submission.createdAt)}</p>
          </div>
        </div>
        <Badge variant="status" status={submission.status}>{submission.status}</Badge>
      </div>

      {submission.description && (
        <p className="text-sm text-white/70">{submission.description}</p>
      )}

      <a
        href={submission.evidenceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm text-sorowork-blue hover:underline"
      >
        <ExternalLink size={14} />
        View Evidence
      </a>

      {isCreator && submission.status === 'PENDING' && (
        <div className="flex gap-2 pt-2 border-t border-white/5">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => onApprove?.(submission.id)}
          >
            <CheckCircle size={14} />
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="flex-1"
            onClick={() => onReject?.(submission.id)}
          >
            <XCircle size={14} />
            Reject
          </Button>
        </div>
      )}
    </Card>
  )
}
