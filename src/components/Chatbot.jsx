import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'
const MODEL = 'mistral-small-latest'

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.

Personnalité : professionnel mais chaleureux, passionné d'histoire, enthousiaste. Tu conseilles les clients avec bienveillance et expertise.

Connaissances :
- Paris 1889 (Exposition universelle, tour Eiffel, Belle Époque, Montmartre)
- Crétacé, il y a environ 65 millions d'années (dinosaures, forêts préhistoriques, paléontologie)
- Florence 1504 (Renaissance, Michel-Ange, David, Léonard de Vinci, Médicis)

Tu peux conseiller une destination selon les intérêts du client (culture, aventure, art, nature, etc.). Si on te demande des prix, fournis des tarifs fictifs mais cohérents et crédibles (ex. Paris 1889 : à partir de 4 200 €/personne pour 3 jours, Crétacé : à partir de 8 500 € pour 5 jours, Florence 1504 : à partir de 3 800 € pour 4 jours). Indique que les prix sont donnés à titre indicatif et que le devis définitif se fait sur demande.

Réponds toujours en français, de façon concise et engageante. Reste dans le cadre des voyages temporels proposés par TimeTravel Agency.`

const btnTransition = { duration: 0.7, ease: 'easeOut' }

/** Affiche le texte en rendant **gras** sans afficher les astérisques. */
function renderMessageContent(text) {
  if (typeof text !== 'string') return text
  const parts = text.split('**')
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Bonjour ! Je suis l'assistant de TimeTravel Agency. Posez-moi vos questions sur nos destinations (Paris 1889, Crétacé, Florence 1504), les tarifs ou le type de voyage qui vous correspond.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const buildMessagesForApi = (userContent) => {
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
      { role: 'user', content: userContent },
    ]
    return apiMessages
  }

  const send = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    if (!apiKey) {
      const isLocal = import.meta.env.DEV
      setError(
        isLocal
          ? 'Clé API Mistral manquante. Créez un fichier .env à la racine avec : VITE_MISTRAL_API_KEY=votre_cle Puis redémarrez (npm run dev).'
          : 'Clé API manquante sur le serveur. Sur Vercel : Settings → Environment Variables → ajoutez VITE_MISTRAL_API_KEY puis redéployez.'
      )
      return
    }

    const userMessage = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(MISTRAL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: buildMessagesForApi(trimmed),
          max_tokens: 512,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        const message =
          errData.message ||
          errData.error?.message ||
          errData.detail ||
          (typeof errData.detail === 'string' ? errData.detail : null) ||
          `Erreur API ${response.status}`
        throw new Error(message)
      }

      const data = await response.json()
      const assistantContent =
        data.choices?.[0]?.message?.content?.trim() ||
        "Désolé, je n'ai pas pu générer de réponse. Réessayez."

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantContent }])
    } catch (err) {
      const fallback =
        "Désolé, le service est temporairement indisponible. Vous pouvez nous contacter par email ou via la page Contact."
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: err.message || fallback },
      ])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Widget flottant */}
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-accent-gold text-dark-950 shadow-lg shadow-accent-gold/30 flex items-center justify-center hover:bg-accent-amber transition-colors"
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={btnTransition}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Fenêtre de chat */}
      {open && (
        <motion.div
          className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:right-6 sm:left-auto z-50 w-full sm:max-w-md rounded-2xl border border-dark-600 bg-dark-800 shadow-2xl flex flex-col overflow-hidden max-h-[calc(100dvh-6rem)] sm:max-h-[80vh]"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={btnTransition}
        >
          {/* En-tête */}
          <div className="flex-shrink-0 px-4 py-3 bg-dark-700 border-b border-dark-600 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold text-white">Assistant TimeTravel</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] sm:min-h-[240px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm sm:text-base ${
                    msg.role === 'user'
                      ? 'bg-accent-gold text-dark-950'
                      : 'bg-dark-600 text-gray-200'
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-2.5 bg-dark-600 text-gray-400 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Erreur API */}
          {error && (
            <div className="flex-shrink-0 px-4 py-2 bg-red-900/20 border-t border-dark-600 text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* Saisie */}
          <div className="flex-shrink-0 p-3 border-t border-dark-600 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Posez-moi vos questions sur les voyages temporels..."
              className="flex-1 rounded-xl bg-dark-700 border border-dark-600 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 text-sm sm:text-base"
              disabled={loading}
            />
            <motion.button
              type="button"
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 bg-accent-gold text-dark-950 rounded-xl font-medium hover:bg-accent-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={btnTransition}
            >
              Envoyer
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  )
}
