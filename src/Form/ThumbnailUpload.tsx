import { Waveform } from '@uiball/loaders'
import { useState } from 'react'
import { Icon, Upload } from 'tabler-icons-react'

interface Props {
  multiple?: boolean
  Icon?: Icon
  label?: string
  placeholder?: string
  onChange?: (file: File) => Promise<void>
  disabled?: boolean
  value?: string
}

export function ThumbnailUpload({ label, value, onChange, disabled }: Props) {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex-none w-16 h-16">
      <input
        type={'file'}
        disabled={disabled || loading}
        value={''}
        onChange={async (e) => {
          const { files } = e.target
          if (files.length > 0) {
            const file = files[0]
            setLoading(true)
            try {
              await onChange(file)
            } catch (error) {
            } finally {
              setLoading(false)
            }
          }
        }}
        className="hidden"
        id="file"
      />
      <label
        htmlFor="file"
        className="h-16 w-16 relative  group cursor-pointer bg-cover bg-no-repeat  rounded-full grid place-items-center"
        style={{
          backgroundImage: `url("${value}")`
        }}
      >
        {label && (
          <div
            style={{ fontSize: '10px' }}
            className="absolute opacity-0  transition group-hover:opacity-100 font-bold uppercase text-white tracking-tighter inset-0 bg-black/70 grid place-items-center text-center rounded-full "
          >
            {label}
          </div>
        )}

        <Upload className="absolute bg-slate-300 z-20  text-black rounded-full p-1 -top-1 -right-1" />
        <div
          className={`${
            loading ? 'opacity-100' : 'opacity-0'
          } transition-opacity bg-black/80 justify-center rounded-full absolute z-20 inset-0 grid place-items-center`}
        >
          <Waveform lineWeight={1} size={12} speed={1.2} color="white" />
        </div>
      </label>
    </div>
  )
}
