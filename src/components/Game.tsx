import { useState, useEffect } from 'react'
import { Pokemon, Difficulty, GameStatus, DIFFICULTY_CARDS } from '@/types/pokemon'
import { shuffleArray, generateRandomIds } from '@/lib/utils'

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2/pokemon'
const POKEMON_ID_RANGE = { min: 1, max: 1010 }

async function fetchPokemonById(id: number): Promise<Pokemon> {
  const res = await fetch(`${POKEMON_API_BASE}/${id}`)
  const data = await res.json()
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
  }
}

async function fetchRandomPokemon(count: number): Promise<Pokemon[]> {
  const ids = generateRandomIds(count, POKEMON_ID_RANGE.min, POKEMON_ID_RANGE.max)
  return Promise.all(ids.map(fetchPokemonById))
}

export default function Game() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [clickedIds, setClickedIds] = useState<Set<number>>(new Set())
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem('bestScore')
    return stored ? parseInt(stored, 10) : 0
  })
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [status, setStatus] = useState<GameStatus>('loading')

  // Fetch pokemon when difficulty changes
  useEffect(() => {
    let ignore = false

    async function loadPokemon() {
      setStatus('loading')
      setClickedIds(new Set())
      setScore(0)

      const data = await fetchRandomPokemon(DIFFICULTY_CARDS[difficulty])
      if (!ignore) {
        setPokemon(shuffleArray(data))
        setStatus('playing')
      }
    }

    loadPokemon()
    return () => { ignore = true }
  }, [difficulty])

  // Persist best score
  useEffect(() => {
    localStorage.setItem('bestScore', bestScore.toString())
  }, [bestScore])

  function handleCardClick(id: number) {
    if (status !== 'playing') return

    if (clickedIds.has(id)) {
      // Already clicked — game over
      setStatus('lost')
      return
    }

    const newClickedIds = new Set(clickedIds).add(id)
    const newScore = score + 1

    setClickedIds(newClickedIds)
    setScore(newScore)

    if (newScore > bestScore) {
      setBestScore(newScore)
    }

    // Check win condition
    if (newClickedIds.size === pokemon.length) {
      setStatus('won')
      return
    }

    // Shuffle cards
    setPokemon(shuffleArray(pokemon))
  }

  function handleRestart() {
    setClickedIds(new Set())
    setScore(0)
    setPokemon(shuffleArray(pokemon))
    setStatus('playing')
  }

  function handleDifficultyChange(newDifficulty: Difficulty) {
    setDifficulty(newDifficulty)
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Header with scores and difficulty */}
      <div className="flex items-center gap-8">
        <div className="text-lg">
          Score: <span className="font-bold text-primary">{score}</span>
        </div>
        <div className="text-lg">
          Best: <span className="font-bold text-primary">{bestScore}</span>
        </div>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md"
          disabled={status === 'loading'}
        >
          <option value="easy">Easy (6)</option>
          <option value="medium">Medium (12)</option>
          <option value="hard">Hard (18)</option>
        </select>
      </div>

      {/* Loading state */}
      {status === 'loading' && (
        <div className="text-xl">Loading Pokémon...</div>
      )}

      {/* Game grid */}
      {status !== 'loading' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pokemon.map((p) => (
            <button
              key={p.id}
              onClick={() => handleCardClick(p.id)}
              disabled={status !== 'playing'}
              className="bg-card rounded-lg p-4 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={p.image} alt={p.name} className="w-24 h-24 mx-auto" />
              <p className="text-center capitalize mt-2">{p.name}</p>
            </button>
          ))}
        </div>
      )}

      {/* Game over / Win state */}
      {(status === 'lost' || status === 'won') && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              {status === 'won' ? '🎉 You Won!' : '😢 Game Over'}
            </h2>
            <p className="text-lg mb-2">Score: {score}</p>
            <p className="text-muted-foreground mb-6">Best: {bestScore}</p>
            <button
              onClick={handleRestart}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

