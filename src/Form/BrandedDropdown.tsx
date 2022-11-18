import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, ReactElement } from 'react'
import { Icon } from 'tabler-icons-react'
import { classNames } from '../lib/utils'
import { Option } from '../store/types'
import { FancyNumber } from '../Tag/FancyNumber'
interface Props<T> {
  options?: Option<T>[]
  label?: string | ReactElement
  helpText?: string
  onChange?: (selected: T) => void
  value?: T
  Icon?: Icon
  disabled?: boolean
}

export function BrandedDropdown<T>({ options, label, Icon, value, onChange, disabled }: Props<T>) {
  const selected = options.find((option) => option.value === value) ||
    options[0] || { label: 'Select Option', value: undefined }
  return (
    <div className="items-center  text-sm">
      {label && (
        <div className="flex mb-2 w-full items-center justify-between">
          <div className="font-semibold">{label}</div>
        </div>
      )}
      <Listbox
        disabled={disabled}
        value={selected.value}
        onChange={(selected: any) => {
          const value = selected.value as T
          onChange(value)
        }}
      >
        {({ open }) => (
          <>
            <div className="relative w-full">
              <div className="flex w-full shadow-sm rounded-lg divide-x divide-slate-600">
                <Listbox.Button className="w-full text-left">
                  <div
                    className={`relative z-0 flex w-full shadow-sm rounded-lg bg-slate-700/50 text-white hover:bg-slate-600/50 ${
                      open && 'bg-slate-400/50'
                    } transition-colors`}
                  >
                    <div className="relative inline-flex w-full items-center  py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                      {selected.Icon && <selected.Icon className="h-5 w-5" aria-hidden="true" />}
                      <p className="ml-2.5 text-sm font-medium">{selected.label}</p>
                    </div>
                    <button className="relative inline-flex items-center p-2 rounded-l-none rounded-r-md text-sm font-medium text-white">
                      <span className="sr-only">Change option</span>
                      <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Listbox.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="origin-top-right absolute z-50 right-0 mt-2 w-full max-h-96 border-slate-300 overflow-auto rounded-lg  bg-slate-900 divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      disabled={option.comingSoon}
                      key={value.toString()}
                      className={({ active, selected }) =>
                        classNames(
                          active
                            ? 'text-white bg-slate-800 hover:bg-slate-800 transition-colors'
                            : 'text-slate-300',
                          selected && 'bg-slate-800 hover:bg-slate-800 transition-colors',
                          option.comingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                          'select-none relative p-4 text-sm nowheel'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <div className="">
                          <div className="flex w-full justify-between">
                            <p
                              className={classNames(
                                selected ? 'font-semibold' : 'font-semibold',
                                'flex gap-2'
                              )}
                            >
                              {option.Icon && (
                                <option.Icon className="flex-none" aria-hidden="true" />
                              )}
                              <p>
                                <div className="flex justify-between gap-1.5">
                                  {option.label}
                                  {option.comingSoon && <FancyNumber>Coming Soon</FancyNumber>}
                                </div>

                                {option.description ? (
                                  <p
                                    className={classNames(
                                      'text-slate-300 flex-wrap font-normal w-full flex'
                                    )}
                                  >
                                    {option.description}
                                  </p>
                                ) : null}
                              </p>
                            </p>
                            {selected ? (
                              <span className={active ? 'text-slate-300' : 'text-slate-500'}>
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}
