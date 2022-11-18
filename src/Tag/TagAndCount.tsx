import { ReactNode } from 'react'
import { FancyNumber } from './FancyNumber'

interface Props {
  category?: string
  tag: string | ReactNode
  stat?: string | ReactNode
}
export const TagAndCount = ({ category, tag, stat }: Props) => {
  return (
    <div className="bg-slate-700/50 pr-2 pl-3 h-10 items-center text-lg py-1 z-20 text-slate-300  font-bold flex gap-2.5 rounded-lg  border-white/10 border">
      <span>
        {category && <span>{category} → </span>}
        {tag}
      </span>
      {stat && (
        <span className="-mt-1">
          <FancyNumber>{stat}</FancyNumber>
        </span>
      )}
    </div>
  )
}
