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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-background border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="font-pokemon text-5xl text-center">
            {isWin ? (
              <span className="text-primary">You Won!</span>
            ) : (
              <span className="text-accent">Game Over</span>
            )}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {isWin
              ? 'Amazing! You remembered all the Pokémon!'
              : 'Oops! You clicked the same card twice!'}
          </DialogDescription>
        </DialogHeader>
        <div className="text-center py-6">
          <div className="flex justify-center gap-8">
            <div>
              <span className="text-muted-foreground text-sm">Final Score</span>
              <p className="font-pokemon text-5xl text-primary">{score}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Best Score</span>
              <p className="font-pokemon text-5xl text-secondary">{bestScore}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="font-semibold text-lg px-8"
          >
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
