import { Pokemon } from '@/types/pokemon'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: () => void
  disabled?: boolean
}

export default function PokemonCard({ pokemon, onClick, disabled }: PokemonCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-transform hover:scale-105 active:scale-95',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-4 flex flex-col items-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24"
          draggable={false}
        />
        <p className="text-center capitalize mt-2 font-medium">{pokemon.name}</p>
      </CardContent>
    </Card>
  )
}

