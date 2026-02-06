import Header from './components/Header'
import Hero from './components/Hero'
import DestinationCards from './components/DestinationCards'
import Quiz from './components/Quiz'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-gray-100">
      <Header />
      <main>
        <Hero />
        <DestinationCards />
        <Quiz />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
