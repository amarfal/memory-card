export interface Pokemon {
  id: number
  name: string
  image: string
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameStatus = 'loading' | 'playing' | 'lost' | 'won'

export const DIFFICULTY_CARDS: Record<Difficulty, number> = {
  easy: 6,
  medium: 12,
  hard: 18,
}

