import { motion } from 'framer-motion'

const socials = [
  { name: 'Twitter', href: '#', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { name: 'LinkedIn', href: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', href: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
]

const footerTransition = { duration: 0.7, ease: 'easeOut' }

export default function Footer() {
  return (
    <motion.footer
      id="contact"
      className="relative bg-dark-950 border-t border-dark-700 py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={footerTransition}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Marque */}
          <div className="lg:col-span-2">
            <motion.a
              href="#hero"
              className="inline-block font-display text-2xl font-bold text-accent-gold mb-4"
              whileHover={{ scale: 1.02 }}
              transition={footerTransition}
            >
              TimeTravel Agency
            </motion.a>
            <p className="text-gray-400 max-w-sm mb-6">
              Voyagez à travers les époques en toute sécurité. Paris 1889, Crétacé, Florence 1504 — l’histoire n’attend que vous.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-accent-gold transition-colors"
                  aria-label={social.name}
                  whileHover={{ scale: 1.15 }}
                  transition={footerTransition}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <motion.a
                  href="mailto:contact@timetravel-agency.com"
                  className="hover:text-accent-gold transition-colors inline-block"
                  whileHover={{ x: 4 }}
                  transition={footerTransition}
                >
                  contact@timetravel-agency.com
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="tel:+33100000000"
                  className="hover:text-accent-gold transition-colors inline-block"
                  whileHover={{ x: 4 }}
                  transition={footerTransition}
                >
                  +33 1 00 00 00 00
                </motion.a>
              </li>
              <li>Paris, France</li>
            </ul>
          </div>

          {/* Liens */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Liens</h3>
            <ul className="space-y-3">
              <li>
                <motion.a href="#hero" className="text-gray-400 hover:text-accent-gold transition-colors inline-block" whileHover={{ x: 4 }} transition={footerTransition}>Accueil</motion.a>
              </li>
              <li>
                <motion.a href="#destinations" className="text-gray-400 hover:text-accent-gold transition-colors inline-block" whileHover={{ x: 4 }} transition={footerTransition}>Destinations</motion.a>
              </li>
              <li>
                <motion.a href="#quiz" className="text-gray-400 hover:text-accent-gold transition-colors inline-block" whileHover={{ x: 4 }} transition={footerTransition}>Quiz</motion.a>
              </li>
              <li>
                <motion.a href="#contact" className="text-gray-400 hover:text-accent-gold transition-colors inline-block" whileHover={{ x: 4 }} transition={footerTransition}>Contact</motion.a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} TimeTravel Agency. Tous droits réservés.</p>
          <p>Voyages temporels sous licence CTC-2024.</p>
        </div>
      </div>
    </motion.footer>
  )
}
