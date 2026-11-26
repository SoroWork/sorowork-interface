import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-[200px] text-center">
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">Something went wrong</h3>
            <p className="text-sm text-white/40">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
