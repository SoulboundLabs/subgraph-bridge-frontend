import { classNames } from '../lib/utils'
import { Option } from '../store/types'

interface Props<T> {
  selected: []
  options?: Option<T>[]
  label?: string
  helpText?: string
  onChange?: (option: T) => void
  value?: T
}

export function TagsSelect<T>({ selected = [], options, label, helpText, onChange }: Props<T>) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <h2 className="font-semibold">{label}</h2>
          <a href="#" className="text-sm font-medium text-sky-300 hover:underline">
            {helpText}
          </a>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-11">
        {options.map((option, i) => (
          <span
            key={i}
            className={classNames(
              'cursor-pointer focus:outline-none',
              selected
                ? 'bg-sky-500 border-transparent text-white'
                : 'bg-slate-500/50 hover:bg-gray-400/50',
              ' rounded-md py-1 px-1 transition-colors 2 flex items-center justify-center hover:text-white font-bold uppercase sm:flex-1'
            )}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  )
}
