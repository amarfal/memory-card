interface ScoreboardProps {
  score: number
  bestScore: number
}

export default function Scoreboard({ score, bestScore }: ScoreboardProps) {
  return (
    <div className="flex items-center gap-8">
      <div className="text-lg">
        Score: <span className="font-bold text-primary">{score}</span>
      </div>
      <div className="text-lg">
        Best: <span className="font-bold text-primary">{bestScore}</span>
      </div>
    </div>
  )
}

