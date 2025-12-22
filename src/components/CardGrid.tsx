import { Pokemon } from '@/types/pokemon'
import PokemonCard from './PokemonCard'

interface CardGridProps {
  pokemon: Pokemon[]
  onCardClick: (id: number) => void
  disabled?: boolean
}

export default function CardGrid({ pokemon, onCardClick, disabled }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          onClick={() => onCardClick(p.id)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

