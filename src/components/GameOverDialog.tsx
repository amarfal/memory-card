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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-card to-background border-2 border-primary/30 btn-shadow">
        <DialogHeader>
          <DialogTitle className="font-pokemon text-5xl text-center pokemon-title">
            {isWin ? 'You Won!' : 'Game Over'}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2 text-shadow">
            {isWin
              ? 'Amazing! You remembered all the PoKéMoN!'
              : 'Oops! You clicked the same card twice!'}
          </DialogDescription>
        </DialogHeader>
        <div className="text-center py-6">
          <div className="flex justify-center gap-12">
            <div className="flex flex-col items-center gap-2">
              <span className="text-muted-foreground text-sm text-shadow">Final Score</span>
              <p className="font-pokemon text-4xl text-primary text-shadow-lg">{score}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-muted-foreground text-sm text-shadow">Best Score</span>
              <p className="font-pokemon text-4xl text-secondary text-shadow-lg">{bestScore}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="font-semibold text-lg px-8 btn-shadow"
          >
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
