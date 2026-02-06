import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const transition = { duration: 0.4, ease: 'easeOut' }

const QUESTIONS = [
  {
    id: 'experience',
    label: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: 'Culturelle et artistique', value: 'paris' },
      { label: 'Aventure et nature', value: 'cretace' },
      { label: 'Élégance et raffinement', value: 'florence' },
    ],
  },
  {
    id: 'period',
    label: 'Votre période préférée ?',
    options: [
      { label: 'Histoire moderne', value: 'paris' },
      { label: 'Temps anciens', value: 'cretace' },
      { label: 'Renaissance', value: 'florence' },
    ],
  },
  {
    id: 'preference',
    label: 'Vous préférez :',
    options: [
      { label: 'Effervescence urbaine', value: 'paris' },
      { label: 'Nature sauvage', value: 'cretace' },
      { label: 'Art et architecture', value: 'florence' },
    ],
  },
  {
    id: 'activity',
    label: "Votre activité idéale :",
    options: [
      { label: 'Visiter des monuments', value: 'paris' },
      { label: 'Observer la faune', value: 'cretace' },
      { label: 'Explorer des musées', value: 'florence' },
    ],
  },
]

const DESTINATIONS = {
  paris: {
    id: 'paris',
    title: 'Paris 1889',
    period: 'Exposition universelle',
    description: 'La Belle Époque, la tour Eiffel, Montmartre et les cabarets vous attendent.',
    gradient: 'from-amber-900/40 via-rose-900/20 to-dark-800',
    imageSrc: '/assets/hero-paris.jpg',
  },
  cretace: {
    id: 'cretace',
    title: 'Crétacé',
    period: 'Il y a 66 millions d’années',
    description: 'Forêts préhistoriques et dinosaures : l’aventure paléontologique ultime.',
    gradient: 'from-emerald-900/40 via-teal-900/20 to-dark-800',
    imageSrc: '/assets/hero-cretace.jpg',
  },
  florence: {
    id: 'florence',
    title: 'Florence 1504',
    period: 'Renaissance',
    description: 'Michel-Ange, Léonard de Vinci et les Médicis : l’art à son apogée.',
    gradient: 'from-amber-800/40 via-orange-900/20 to-dark-800',
    imageSrc: '/assets/hero-florence.jpg',
  },
}

function getRecommendedDestination(answers) {
  const counts = { paris: 0, cretace: 0, florence: 0 }
  answers.forEach((value) => {
    if (value && counts[value] !== undefined) counts[value]++
  })
  const max = Math.max(counts.paris, counts.cretace, counts.florence)
  if (counts.paris === max) return 'paris'
  if (counts.cretace === max) return 'cretace'
  return 'florence'
}

function buildExplanation(answers, destinationKey) {
  const dest = DESTINATIONS[destinationKey]
  const labels = QUESTIONS.map((q, i) => {
    const opt = q.options.find((o) => o.value === answers[i])
    return opt ? opt.label : null
  }).filter(Boolean)
  const intro =
    labels.length > 0
      ? `Vous avez choisi : ${labels.join(', ')}. `
      : ''
  return `${intro}Notre recommandation pour vous : ${dest.title}. ${dest.description}`
}

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const isComplete = step >= QUESTIONS.length
  const currentQuestion = QUESTIONS[step]
  const recommendedKey = isComplete ? getRecommendedDestination(answers) : null
  const destination = recommendedKey ? DESTINATIONS[recommendedKey] : null
  const explanation = recommendedKey ? buildExplanation(answers, recommendedKey) : ''

  const handleAnswer = (value) => {
    const newAnswers = [...answers]
    newAnswers[step] = value
    setAnswers(newAnswers)
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1)
    } else {
      setStep(QUESTIONS.length)
    }
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers([])
  }

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  return (
    <section
      id="quiz"
      className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-dark-900"
    >
      <div className="max-w-2xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent-gold font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Trouvez votre destination
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Quel voyage temporel vous correspond ?
          </h2>
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
            Répondez à 4 questions pour obtenir une recommandation personnalisée.
          </p>
        </div>

        {/* Barre de progression */}
        <div className="mb-8 sm:mb-10">
          <div className="h-1.5 rounded-full bg-dark-700 overflow-hidden">
            <motion.div
              className="h-full bg-accent-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + (isComplete ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
              transition={transition}
            />
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center">
            Question {Math.min(step + 1, QUESTIONS.length)} / {QUESTIONS.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isComplete && currentQuestion ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={transition}
              className="rounded-2xl border border-dark-600 bg-dark-800 p-6 sm:p-8"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                {currentQuestion.label}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {currentQuestion.options.map((opt) => (
                  <li key={opt.value}>
                    <motion.button
                      type="button"
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full text-left rounded-xl border border-dark-600 bg-dark-700 px-4 sm:px-5 py-3.5 sm:py-4 text-gray-200 hover:border-accent-gold/50 hover:bg-dark-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:ring-offset-2 focus:ring-offset-dark-800"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={transition}
                    >
                      <span className="font-medium">{opt.label}</span>
                    </motion.button>
                  </li>
                ))}
              </ul>
              {step > 0 && (
                <div className="mt-6 sm:mt-8 pt-4 border-t border-dark-600">
                  <motion.button
                    type="button"
                    onClick={handlePrev}
                    className="text-sm text-gray-400 hover:text-accent-gold transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Question précédente
                  </motion.button>
                </div>
              )}
            </motion.div>
          ) : isComplete && destination ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="space-y-6 sm:space-y-8"
            >
              <div className="rounded-2xl border border-dark-600 bg-dark-800 overflow-hidden">
                <div
                  className={`h-32 sm:h-40 bg-gradient-to-br ${destination.gradient} flex items-end p-6 sm:p-8`}
                >
                  <div>
                    <p className="text-accent-gold/90 text-sm font-medium tracking-wider uppercase">
                      Votre destination
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                      {destination.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mt-1">
                      {destination.period}
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-gray-300 leading-relaxed">{explanation}</p>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`#destination-${destination.id}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-gold text-dark-950 font-medium hover:bg-accent-amber transition-colors"
                    >
                      Voir cette destination
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <motion.button
                      type="button"
                      onClick={handleRestart}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dark-600 text-gray-300 hover:border-accent-gold/50 hover:text-accent-gold transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={transition}
                    >
                      Refaire le quiz
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}
