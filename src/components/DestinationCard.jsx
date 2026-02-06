import { useState } from 'react'
import { motion } from 'framer-motion'

const gradients = {
  paris: 'from-amber-900/40 via-rose-900/20 to-dark-800',
  cretace: 'from-emerald-900/40 via-teal-900/20 to-dark-800',
  florence: 'from-amber-800/40 via-orange-900/20 to-dark-800',
}

const cardTransition = { duration: 0.7, ease: 'easeOut' }

export default function DestinationCard({
  id,
  title,
  period,
  description,
  ctaLabel,
  gradient,
  imageSrc,
  index = 0,
}) {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const showImage = imageSrc && !imgError

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-dark-600 bg-dark-800 flex flex-col touch-manipulation"
      whileHover={{ scale: 1.03, y: -8 }}
      transition={cardTransition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image hero (lazy) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video flex-shrink-0 overflow-hidden bg-dark-700">
        {showImage && (
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradients[gradient]} transition-opacity duration-300 ${showImage && imgLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden
        />
        {showImage && imgLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent pointer-events-none"
            aria-hidden
          />
        )}
      </div>

      {/* Contenu texte */}
      <div className="relative flex flex-col flex-grow min-h-0 p-4 sm:p-5 md:p-6">
        <div
          className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none group-hover:animate-shine z-0"
          aria-hidden
        />
        <div
          className={`absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none transition-opacity duration-300 ${
            hovered ? 'opacity-100 border-accent-gold/30 shadow-[inset_0_0_30px_rgba(201,162,39,0.08)]' : 'opacity-0'
          }`}
          aria-hidden
        />

        <div className="relative z-10 flex flex-col flex-grow">
          <span className="text-accent-gold/90 text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors duration-300 group-hover:text-accent-gold">
            {period}
          </span>
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2 mb-2 sm:mb-3 transition-transform duration-300 group-hover:translate-x-0.5">
            {title}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 flex-grow line-clamp-4 sm:line-clamp-none">
            {description}
          </p>
          <motion.a
            href={`#destination-${id}`}
            className={`inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[48px] px-4 sm:px-5 py-3 sm:py-2.5 rounded-xl font-medium text-sm sm:text-base ${
              hovered
                ? 'bg-accent-gold text-dark-950 shadow-lg shadow-accent-gold/25'
                : 'bg-accent-gold/20 text-accent-gold border border-accent-gold/40 hover:bg-accent-gold/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={cardTransition}
          >
            {ctaLabel}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${hovered ? 'translate-x-0.5' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}
