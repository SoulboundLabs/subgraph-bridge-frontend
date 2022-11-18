import { ReactElement } from 'react'
import { Icon } from 'tabler-icons-react'
import { Option } from '../store/types'
interface Props {
  options?: Option<string>[]
  label?: string | ReactElement
  helpText?: string
  onChange?: (selected: string) => void
  value?: string
  Icon?: Icon
  disabled?: boolean
}

export function SelectDropdown({ options, label, Icon, value, onChange, disabled }: Props) {
  const selected = options.find((option) => option.value === value) ||
    options[0] || { label: 'Select Option', value: undefined }
  return (
    <div className="items-center  text-sm">
      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
