interface Props {
  children: React.ReactNode
  bg?: string
  color?: string
  className?: string
  onClick?: () => void
}

export const StatTag = ({
  children,
  bg = 'bg-slate-700/50',
  color = 'text-sky-300',
  className = '',
  onClick
}: Props) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex border border-slate-500 font-bold items-center px-2 py-0.5 rounded text-xs ${bg} `}
    >
      {children}
    </span>
  )
}
