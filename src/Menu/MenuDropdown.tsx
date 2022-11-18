/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react'
import { Fragment, ReactElement } from 'react'
import { Icon } from 'tabler-icons-react'
import { classNames } from '../lib/utils'

export interface MenuOption {
  label: string | ReactElement
  onClick?: () => void
  Icon?: Icon
  href?: string
  comingSoon?: boolean
}

interface Props {
  label: string | ReactElement
  menuOptions: MenuOption[]
  bottomMenuOptions?: MenuOption[]
  className?: (open: boolean) => string
}

export function MenuDropdown({ label, menuOptions, bottomMenuOptions, className }: Props) {
  const defaultClassName = (open) =>
    `cursor-pointer focus:outline-none text-white font-semibold h-12 pr-4 pl-3.5 rounded-lg w-full flex items-center justify-center  ${
      open ? 'opacity-100' : 'opacity-70'
    } hover:opacity-100 transition`

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className={className ? className(open) : defaultClassName(open)}>
              {label}
              {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="divide-y divide-gray-200 origin-top-right absolute right-0 z-20 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {menuOptions.map(({ label, Icon, href, onClick, comingSoon }) => (
                  <Menu.Item key={label.toString()}>
                    {({ active }) => (
                      <a
                        href={href}
                        target={href ? '_blank' : undefined}
                        onClick={onClick}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          comingSoon ? 'cursor-default' : 'cursor-pointer',
                          ' px-4 py-2 flex items-center gap-3 text-sm'
                        )}
                      >
                        {Icon && <Icon />}
                        {label}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
              {bottomMenuOptions && (
                <div className="py-1">
                  {bottomMenuOptions.map((option) => (
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          target="_blank"
                          href={option.href}
                          onClick={option.onClick}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            ' px-4 py-2 flex items-center gap-3 cursor-pointer text-sm'
                          )}
                        >
                          {option.label}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              )}
              {/* <div className="text-xs py-2 text-center text-gray-700"></div> */}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
