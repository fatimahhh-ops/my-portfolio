'use client'

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted font-body">
          © {new Date().getFullYear()} Fatima Ahmed. Built with Next.js, Tailwind & Framer Motion.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor-hover
          className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 transition-all duration-200"
          aria-label="Back to top"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
