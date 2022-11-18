interface Props {
  children: React.ReactNode
}

export const FancyNumber = ({ children }: Props) => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-center font-bold rounded justify-center text-xs bg-slate-900 text-slate-300">
      {children}
    </span>
  )
}
