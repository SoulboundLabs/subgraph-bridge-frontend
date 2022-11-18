import { RadioGroup } from '@headlessui/react'
import { BoxModel2 } from 'tabler-icons-react'
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

export function RadioCards<T>({ value, options, label, helpText, onChange }: Props<T>) {
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
      >
        <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
        <div className="flex flex-col text-left mt-2 justify-between  gap-4">
          {options.map(({ comingSoon, description, value, label }) => (
            <RadioGroup.Option value={value}>
              {({ checked }) => (
                <RadioGroup.Label as="div">
                  <div
                    className={classNames(
                      'border rounded-lg p-4',
                      comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    )}
                  >
                    <div className="flex font-semibold text-base justify-between">
                      <div className="flex gap-2">
                        {label}
                        {comingSoon && <FancyNumber>Coming Soon</FancyNumber>}
                      </div>
                      <div className="flex-none">
                        <BoxModel2 {...(checked ? { fill: 'rgb(2 132 199)' } : {})} />
                      </div>
                    </div>
                    <div className="opacity-80">{description}</div>
                  </div>
                </RadioGroup.Label>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
