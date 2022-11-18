import { Switch } from '@headlessui/react'
import { classNames } from '../lib/utils'

interface Props {
  description?: string
  label?: string
  enabled: boolean
  danger?: boolean
  setEnabled: (enabled: boolean) => void
}

export function ToggleInput({ description, label, enabled, setEnabled, danger }: Props) {
  const activeBackgroundColor = danger ? 'bg-rose-600' : 'bg-sky-600'
  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex-grow flex flex-col">
        <Switch.Label as="span" className="text-sm font-medium  " passive>
          {label}
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-slate-300">
          {description}
        </Switch.Description>
      </span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? activeBackgroundColor : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}
