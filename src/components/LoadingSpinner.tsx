import { useMemo } from 'react'

const BALL_TYPES = ['pokeball', 'greatball', 'ultraball', 'masterball'] as const
type BallType = typeof BALL_TYPES[number]

const BALL_NAMES: Record<BallType, string> = {
  pokeball: 'Poké Ball',
  greatball: 'Great Ball',
  ultraball: 'Ultra Ball',
  masterball: 'Master Ball',
}

export default function LoadingSpinner() {
  const ballType = useMemo(
    () => BALL_TYPES[Math.floor(Math.random() * BALL_TYPES.length)],
    []
  )

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className={`pokeball pokeball--${ballType}`} />
      <p className="text-muted-foreground">
        Catching Pokémon with {BALL_NAMES[ballType]}...
      </p>
    </div>
  )
}

