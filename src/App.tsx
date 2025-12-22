import bgImage from '@/assets/bg.jpg'

function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black/70 backdrop-blur-sm rounded-xl p-8">
        <h1 className="text-4xl font-bold text-primary">
          Pokémon Memory Game
        </h1>
      </div>
    </div>
  )
}

export default App
