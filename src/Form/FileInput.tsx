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

export function FileInput({ label, value, onChange, disabled }: Props) {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex justify-center">
      <div className=" w-full">
        {label && (
          <div className="flex items-center justify-between">
            <div className="font-semibold">{label}</div>
          </div>
        )}
        <div className="flex gap-2 mt-1.5 group relative">
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
            className="form-control
            block
            w-full
            cursor-pointer
            px-3
            py-1.5
            text-white
            font-normal
            bg-slate-700/50  hover:bg-slate-600/50 transition-colors  border border-transparent
            rounded
            ease-in-out
            m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="file"
          />
          <label htmlFor="file">
            <div
              className="h-full cursor-pointer relative bg-cover bg-center bg-no-repeat bg-slate-500/50 hover:bg-slate-400/50 w-12 rounded grid place-items-center"
              style={{
                backgroundImage: `url("${value}")`
              }}
            >
              {/* {value && <img src={value} className="w-full rounded max-h-24 object-cover " />} */}
              {!value && !loading && (
                <Upload className="text-white group-hover:opacity-100 opacity-50 transition" />
              )}
              <div
                className={`${
                  loading ? 'opacity-100' : 'opacity-0'
                } transition-opacity bg-black/80 justify-center rounded-md absolute z-20 inset-0 grid place-items-center`}
              >
                <Waveform lineWeight={1} size={12} speed={1.2} color="white" />
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}
