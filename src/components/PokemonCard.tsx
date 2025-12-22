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
        'card-glow cursor-pointer transition-all duration-200',
        'bg-gradient-to-br from-card to-card/80 border-2 border-border/50',
        'hover:scale-105 hover:border-primary/50 active:scale-95',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100 hover:border-border/50'
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-3 sm:p-4 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
            draggable={false}
          />
        </div>
        <p className="text-center capitalize mt-2 font-semibold text-sm sm:text-base">
          {pokemon.name}
        </p>
      </CardContent>
    </Card>
  )
}
