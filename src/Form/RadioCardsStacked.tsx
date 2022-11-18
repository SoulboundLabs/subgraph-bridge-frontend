import { RadioGroup } from '@headlessui/react'
import { classNames } from '../lib/utils'
import { Option } from '../store/types'
import { FancyNumber } from '../Tag/FancyNumber'

interface Props<T> {
  options?: Option<T>[]
  label?: string
  helpText?: string
  onChange?: (option: T) => void
  value?: T
}

export const stackedOptionClass = ({ checked, comingSoon }) =>
  classNames(
    'cursor-pointer focus:outline-none',
    comingSoon && 'opacity-60 cursor-not-allowed',
    checked
      ? 'bg-sky-600 border-transparent text-white'
      : 'bg-slate-700/50 text-white hover:bg-slate-600/50',
    ' rounded-md p-3 transition-colors flex items-center justify-center hover:text-white  sm:flex-1'
  )

export function RadioCardsStacked<T>({ value, options, label, helpText, onChange }: Props<T>) {
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

      <RadioGroup
        value={value}
        onChange={(value) => {
          onChange(value)
        }}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
        <div className="space-y-3">
          {options.map(({ comingSoon, label, value, Icon, description }, i) => (
            <RadioGroup.Option
              key={value.toString()}
              disabled={comingSoon}
              value={value}
              className={({ checked }) => stackedOptionClass({ checked, comingSoon })}
            >
              <RadioGroup.Label as="div" className="flex">
                <div>
                  <div className="font-semibold text-base flex gap-3">
                    <span className="pt-0.5">
                      <Icon strokeWidth={1.5} />
                    </span>

                    <span className="flex gap-2">
                      {label}
                      {comingSoon && <FancyNumber>Coming Soon</FancyNumber>}
                    </span>
                  </div>
                  <div className="opacity-80 pl-9">{description}</div>
                </div>
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
