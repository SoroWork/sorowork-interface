interface LogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export function Logo({ size = 32, className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt="SoroWork"
        width={size}
        height={size}
        className="rounded-lg object-contain"
      />
      {showText && (
        <span className="font-bold text-xl tracking-tight">
          <span className="text-white">Soro</span>
          <span className="bg-gradient-to-r from-sorowork-purple-light to-sorowork-blue bg-clip-text text-transparent">Work</span>
        </span>
      )}
    </div>
  )
}
