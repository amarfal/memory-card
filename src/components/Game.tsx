import { useState, useEffect } from 'react'
import { Pokemon, Difficulty, GameStatus, DIFFICULTY_CARDS } from '@/types/pokemon'
import { shuffleArray, generateRandomIds } from '@/lib/utils'
import Scoreboard from './Scoreboard'
import DifficultySelector from './DifficultySelector'
import CardGrid from './CardGrid'
import GameOverDialog from './GameOverDialog'

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

    if (newClickedIds.size === pokemon.length) {
      setStatus('won')
      return
    }

    setPokemon(shuffleArray(pokemon))
  }

  function handleRestart() {
    setClickedIds(new Set())
    setScore(0)
    setPokemon(shuffleArray(pokemon))
    setStatus('playing')
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex items-center gap-6">
        <Scoreboard score={score} bestScore={bestScore} />
        <DifficultySelector
          value={difficulty}
          onChange={setDifficulty}
          disabled={status === 'loading'}
        />
      </div>

      {status === 'loading' && (
        <div className="text-xl animate-pulse">Loading Pokémon...</div>
      )}

      {status !== 'loading' && (
        <CardGrid
          pokemon={pokemon}
          onCardClick={handleCardClick}
          disabled={status !== 'playing'}
        />
      )}

      <GameOverDialog
        status={status}
        score={score}
        bestScore={bestScore}
        onRestart={handleRestart}
      />
    </div>
  )
}
