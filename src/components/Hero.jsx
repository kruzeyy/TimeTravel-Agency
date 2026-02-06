import { useState } from 'react'
import { motion } from 'framer-motion'

const transition = { duration: 0.7, ease: 'easeOut' }

/**
 * Hero section avec vidéo de fond (landing).
 * Fade-in progressif et animation d'apparition du titre au chargement.
 */
export default function Hero() {
  const [videoError, setVideoError] = useState(false)

  return (
    <motion.section
      id="hero"
      className="relative min-h-[100dvh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition}
    >
      {/* Fallback gradient (visible uniquement si la vidéo charge en erreur) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 transition-opacity duration-500 ${videoError ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden
      />

      {/* Vidéo de fond */}
      {!videoError && (
        <div className="absolute inset-0 w-full h-full">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onError={() => setVideoError(true)}
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-gradient-to-b from-dark-950/85 via-dark-900/75 to-dark-950/90"
            aria-hidden
          />
        </div>
      )}

      {/* Effets lumineux */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,39,0.12),transparent)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-accent-copper/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grille subtile */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      {/* Contenu avec apparition du titre */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          className="text-accent-gold font-medium tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
        >
          Agence de voyages temporels
        </motion.p>
        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
        >
          Voyagez à travers
          <br />
          <span className="text-accent-gold italic">le temps</span>
        </motion.h1>
        <motion.p
          className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.35 }}
        >
          Paris 1889, âge des dinosaures, Renaissance florentine — vivez l’histoire en direct.
          Sécurité garantie, souvenirs inoubliables.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.5 }}
        >
          <motion.a
            href="#destinations"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-accent-gold text-dark-950 font-semibold rounded-lg shadow-lg shadow-accent-gold/20 text-sm sm:text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={transition}
          >
            Découvrir les destinations
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 border border-dark-600 text-gray-300 rounded-lg hover:border-accent-gold/50 hover:text-accent-gold text-sm sm:text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={transition}
          >
            Nous contacter
          </motion.a>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...transition, delay: 0.8 }}
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-bounce" />
        </div>
      </motion.div>
    </motion.section>
  )
}
