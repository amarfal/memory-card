import bgImage from '@/assets/bg.jpg'
import Game from '@/components/Game'

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-xs">
        <header className="text-center py-8">
          <h1 className="font-pokemon text-5xl md:text-7xl pokemon-title">
            PoKéMoN Memory Game
          </h1>
          <p className="text-foreground/80 mt-6 text-lg text-shadow">
            Click each card only once — don't repeat!
          </p>
        </header>
        <main className="pb-8">
          <Game />
        </main>
      </div>
    </div>
  )
}

export default App
