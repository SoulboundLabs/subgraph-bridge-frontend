import { CloudUpload, Icon } from 'tabler-icons-react'

interface Props {
  multiple?: boolean
  Icon?: Icon
  label?: string
  loading?: boolean
  placeholder?: string
  onChange?: (e: any) => void
  disabled?: boolean
}

export function FileInput({
  label,
  multiple = false,
  loading = false,
  placeholder = '',
  onChange,
  disabled
}: Props) {
  return (
    <div className="flex justify-center items-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-full h-32  rounded-lg border-2  border-dashed cursor-pointer hover:bg-bray-800 bg-gray-700  border-gray-600 hover:border-gray-500 hover:bg-gray-600"
      >
        <div className="flex flex-col justify-center items-center pt-5 pb-6">
          <CloudUpload className="mb-3 w-10 h-10 text-gray-400" />

          <p className="mb-2 text-sm  text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input
          disabled={disabled || loading}
          onChange={(e) => onChange(e.target.files)}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
    </div>
  )
}
