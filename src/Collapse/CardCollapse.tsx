import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

interface Props {
  children: React.ReactNode
  title: string
}

export function CardCollapse({ title, children }: Props) {
  return (
    <div className="w-full p-2 mx-auto rounded-2xl bg-slate-500/20 border border-slate-500/50">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between items-center gap-1 w-full   rounded-lg px-2 py-2 text-sm font-medium text-left   ">
              <span className="flex gap-1 items-center">
                <svg className="mr-1.5 h-2 w-2 text-sky-300" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                <span className="font-bold">{title}</span>
              </span>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-slate-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-2 pb-2 text-white">{children}</Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
