import { Difficulty } from '@/types/pokemon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DifficultySelectorProps {
  value: Difficulty
  onChange: (value: Difficulty) => void
  disabled?: boolean
  extremeBeaten?: boolean
}

export default function DifficultySelector({
  value,
  onChange,
  disabled,
  extremeBeaten,
}: DifficultySelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as Difficulty)}
      disabled={disabled}
    >
      <SelectTrigger className="w-44 bg-card/80 backdrop-blur-sm border-border/50 btn-shadow">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border/50">
        <SelectItem value="easy">Easy (6 cards)</SelectItem>
        <SelectItem value="medium">Medium (12 cards)</SelectItem>
        <SelectItem value="hard">Hard (18 cards)</SelectItem>
        <SelectItem value="extreme">
          Extreme (36 cards) {extremeBeaten && '👑'}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
