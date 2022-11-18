import { Waveform } from '@uiball/loaders'
import { Icon } from 'tabler-icons-react'

interface Props {
  Icon?: Icon
  label?: string
  placeholder?: string
  type?: string
  value?: string | number
  onChange?: (e: any) => void
  disabled?: boolean
  loading?: boolean
  name?: string
  className?: string
  style?: React.CSSProperties
}

export const inputClassNames = `h-9 text-sm w-full placeholder:text-slate-300/40 font-medium bg-transparent border-0 focus:ring-0 appearance-none`

export function InputGroup({
  Icon,
  label,
  placeholder = '',
  name,
  value = '',
  onChange,
  className,
  type = 'text',
  loading,
  disabled,
  style
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
      <div className="flex shadow-sm rounded-md divide-x divide-slate-600/50">
        <div className="relative z-0 w-full flex shadow-sm rounded-md divide-x divide-slate-600/50">
          <div className="relative flex items-center w-full bg-slate-700/50  hover:bg-slate-600/50 transition-colors  border border-transparent rounded-md shadow-sm text-white">
            {Icon && (
              <Icon
                className="h-5 w-5 absolute
            left-2"
                aria-hidden="true"
              />
            )}
            <input
              type={type}
              value={value}
              name={name}
              disabled={disabled}
              style={style}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`${Icon ? 'pl-10 pr-3' : 'px-3'}  ${inputClassNames} ${className}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
