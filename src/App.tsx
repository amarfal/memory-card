import bgImage from '@/assets/bg.jpg'
import Game from '@/components/Game'

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-black/60 backdrop-blur-xs">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-primary drop-shadow-lg">
            Pokémon Memory Game
          </h1>
          <p className="text-muted-foreground mt-2">
            Click each card only once!
          </p>
        </header>
        <main>
          <Game />
        </main>
      </div>
    </div>
  )
}

export default App
