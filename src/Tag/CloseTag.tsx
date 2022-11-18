import { X } from 'tabler-icons-react'

export const CloseTag = ({ category, tag, stat }) => {
  return (
    <div className="bg-rose-700/40 hover:bg-rose-700/80 transition-colors w-8 h-8 cursor-pointer justify-center items-center text-lg py-1 z-20 text-slate-300 absolute -top-12 -mt-1 right-0 text-center font-bold inline-flex rounded-lg shadow-lg border-white/10 border">
      <X className="h-7" />
    </div>
  )
}
