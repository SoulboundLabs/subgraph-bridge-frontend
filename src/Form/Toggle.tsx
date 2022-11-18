/* This example requires Tailwind CSS v2.0+ */
import { Switch } from '@headlessui/react'
import { classNames } from '../lib/utils'

export function Toggle({ enabled, setEnabled, IconEnabled, IconDisabled }) {
  return (
    <div className="py-1">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-sky-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-7 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            enabled ? 'translate-x-4' : 'translate-x-0',
            'pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        >
          <span
            className={classNames(
              enabled ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <IconDisabled className="h-3.5 w-3.5 text-gray-400" />
          </span>
          <span
            className={classNames(
              enabled ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <IconEnabled className="h-3.5 w-3.5 text-gray-400" />
          </span>
        </span>
      </Switch>
    </div>
  )
}
