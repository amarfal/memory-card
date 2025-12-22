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
}

export default function DifficultySelector({
  value,
  onChange,
  disabled,
}: DifficultySelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as Difficulty)}
      disabled={disabled}
    >
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="easy">Easy (6)</SelectItem>
        <SelectItem value="medium">Medium (12)</SelectItem>
        <SelectItem value="hard">Hard (18)</SelectItem>
      </SelectContent>
    </Select>
  )
}

