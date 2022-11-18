import { Waveform } from '@uiball/loaders'
import { Icon } from 'tabler-icons-react'

interface Props {
  Icon?: Icon
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  rows?: number
  style?: React.CSSProperties
  loading?: boolean
}

export function TextareaGroup({
  Icon,
  label,
  placeholder = '',
  loading,
  value = '',
  style,
  onChange,
  rows = 4
}: Props) {
  return (
    <div className="relative w-full space-y-2 text-sm">
      {label && (
        <div className="flex items-center justify-between">
          <div className="font-semibold">{label}</div>
          <div className={`${loading ? 'opacity-100' : 'opacity-0'} transition-opacity `}>
            <Waveform lineWeight={1} size={12} speed={1.2} color="white" />
          </div>
        </div>
      )}
      <div className=" shadow-sm rounded-md divide-x divide-slate-600/50">
        <div className="relative items-center bg-slate-700/50  hover:bg-slate-600/50 transition-colors first-letter:py-1  border border-transparent rounded-md shadow-sm text-white">
          <textarea
            style={style}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className=" text-sm font-medium w-full  block bg-transparent border-0 focus:ring-0 appearance-none"
          />
        </div>
      </div>
    </div>
  )
}
