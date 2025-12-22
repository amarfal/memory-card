interface ScoreboardProps {
  score: number
  bestScore: number
}

export default function Scoreboard({ score, bestScore }: ScoreboardProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <div className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
        <span className="text-muted-foreground text-sm">Score</span>
        <p className="font-pokemon text-3xl text-primary">{score}</p>
      </div>
      <div className="bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/50">
        <span className="text-muted-foreground text-sm">Best</span>
        <p className="font-pokemon text-3xl text-secondary">{bestScore}</p>
      </div>
    </div>
  )
}
