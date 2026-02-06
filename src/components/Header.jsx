import { useState } from 'react'
import { motion } from 'framer-motion'

const btnTransition = { duration: 0.7, ease: 'easeOut' }

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Quiz', href: '#quiz' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#hero"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={btnTransition}
          >
            <span className="text-2xl font-display font-bold text-accent-gold tracking-tight">
              TimeTravel
            </span>
            <span className="text-sm font-body text-gray-400 hidden sm:inline">Agency</span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-accent-gold transition-colors font-medium"
                whileHover={{ y: -2 }}
                transition={btnTransition}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#destinations"
              className="px-5 py-2.5 bg-accent-gold/20 text-accent-gold rounded-lg hover:bg-accent-gold/30 font-medium border border-accent-gold/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={btnTransition}
            >
              Réserver
            </motion.a>
          </nav>

          <motion.button
            type="button"
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            whileTap={{ scale: 0.95 }}
            transition={btnTransition}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-dark-700/50 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-accent-gold transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="#destinations"
              className="px-5 py-2.5 bg-accent-gold/20 text-accent-gold rounded-lg text-center font-medium"
              onClick={() => setMenuOpen(false)}
              whileTap={{ scale: 0.98 }}
              transition={btnTransition}
            >
              Réserver
            </motion.a>
          </nav>
        )}
      </div>
    </header>
  )
}
