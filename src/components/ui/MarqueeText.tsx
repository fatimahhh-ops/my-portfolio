'use client'

interface MarqueeTextProps {
  text: string
  reverse?: boolean
  className?: string
}

export default function MarqueeText({ text, reverse = false, className = '' }: MarqueeTextProps) {
  const tags = text.split(' · ')

  return (
    <div className={`relative py-8 overflow-hidden ${className}`}>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), rgba(168,85,247,0.2), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), rgba(168,85,247,0.2), transparent)' }} />

      {/* Exactly 2 copies — CSS animates 0→-50%, seamlessly loops */}
      <div
        className={`flex gap-3 whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {[...tags, ...tags].map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase flex-shrink-0"
            style={{
              border: `1px solid ${i % 3 === 0 ? 'rgba(99,102,241,0.35)' : i % 3 === 1 ? 'rgba(168,85,247,0.3)' : 'rgba(236,72,153,0.25)'}`,
              background: `${i % 3 === 0 ? 'rgba(99,102,241,0.07)' : i % 3 === 1 ? 'rgba(168,85,247,0.06)' : 'rgba(236,72,153,0.05)'}`,
              color: `${i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#c084fc' : '#f472b6'}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#a855f7' : '#ec4899' }}
            />
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
