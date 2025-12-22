import { GameStatus } from '@/types/pokemon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface GameOverDialogProps {
  status: GameStatus
  score: number
  bestScore: number
  onRestart: () => void
}

export default function GameOverDialog({
  status,
  score,
  bestScore,
  onRestart,
}: GameOverDialogProps) {
  const isOpen = status === 'lost' || status === 'won'
  const isWin = status === 'won'

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isWin ? '🎉 You Won!' : '😢 Game Over'}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {isWin
              ? 'Congratulations! You remembered all the Pokémon!'
              : 'You clicked the same card twice!'}
          </DialogDescription>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-xl">
            Score: <span className="font-bold text-primary">{score}</span>
          </p>
          <p className="text-muted-foreground">
            Best: <span className="font-bold">{bestScore}</span>
          </p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onRestart} size="lg">
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

