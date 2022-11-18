import { NavLink } from 'react-router-dom'
import { Icon } from 'tabler-icons-react'

export const HeaderLink = ({
  Icon,
  label,
  href
}: {
  active?: boolean
  Icon: Icon
  label: string
  href: string
}) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      `cursor-pointer focus:outline-none text-white font-semibold h-12 pr-4 pl-3.5 rounded-lg w-full flex items-center justify-center  ${
        isActive ? 'opacity-100' : 'opacity-70'
      } hover:opacity-100 transition`
    }
  >
    <span className="flex gap-2">
      <Icon /> {label}
    </span>
  </NavLink>
)
