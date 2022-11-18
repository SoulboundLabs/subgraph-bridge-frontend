interface Props {
  children: React.ReactNode
}

export const GradientTag = ({ children }: Props) => {
  return (
    <span className="items-center px-3 bg-opacity-50  py-1.5 text-center font-bold rounded justify-center text-xs  text-white">
      {children}
    </span>
  )
}
