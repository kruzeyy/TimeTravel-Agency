import { motion } from 'framer-motion'
import DestinationCard from './DestinationCard'

const destinations = [
  {
    id: 'paris',
    title: 'Paris 1889',
    period: 'Exposition universelle',
    description: 'Assistez à l’inauguration de la tour Eiffel, aux cabarets de Montmartre et à l’effervescence de la Belle Époque. Une escapade culturelle au cœur du Paris historique.',
    ctaLabel: 'Voir le voyage',
    gradient: 'paris',
    imageSrc: '/assets/hero-paris.jpg',
  },
  {
    id: 'cretace',
    title: 'Crétacé',
    period: 'Il y a 66 millions d’années',
    description: 'Explorez les forêts préhistoriques et observez les dinosaures dans leur habitat. Une aventure paléontologique encadrée par nos guides spécialisés.',
    ctaLabel: 'Explorer l’ère',
    gradient: 'cretace',
    imageSrc: '/assets/hero-cretace.jpg',
  },
  {
    id: 'florence',
    title: 'Florence 1504',
    period: 'Renaissance',
    description: 'Rencontrez les grands maîtres, du David de Michel-Ange aux ateliers de Léonard de Vinci. L’art et la science à leur apogée dans la Florence des Médicis.',
    ctaLabel: 'Réserver la visite',
    gradient: 'florence',
    imageSrc: '/assets/hero-florence.jpg',
  },
]

const sectionTransition = { duration: 0.7, ease: 'easeOut' }

export default function DestinationCards() {
  return (
    <motion.section
      id="destinations"
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-dark-900"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={sectionTransition}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            className="text-accent-gold font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={sectionTransition}
          >
            Nos destinations
          </motion.p>
          <motion.h2
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...sectionTransition, delay: 0.1 }}
          >
            Choisissez votre époque
          </motion.h2>
          <motion.p
            className="text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...sectionTransition, delay: 0.2 }}
          >
            Chaque voyage est sécurisé, encadré et assuré. Réservez en toute confiance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...sectionTransition, delay: index * 0.12 }}
            >
              <DestinationCard {...dest} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
