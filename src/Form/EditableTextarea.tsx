import { useState } from 'react'
import { EditTextarea } from 'react-edit-text'
import { classNames } from '../lib/utils'
export const EditableTextarea = ({
  className,
  placeholder,
  inputClassName,
  readonly,
  rows = 3,
  onSave,
  defaultValue
}) => {
  const [value, setValue] = useState(defaultValue)
  const [charCount, setCharCount] = useState(defaultValue.length)
  const [isEditing, setIsEditing] = useState(false)

  const maxCharCount = 140

  const handleChange = (value: string) => {
    setCharCount(value.length)
    setValue(value)
  }

  const handleSave = (value: string) => {
    if (charCount <= maxCharCount) {
      onSave(value)
    }
  }

  const isOverCharCount = charCount > maxCharCount
  const isApproachingCharCount = charCount > maxCharCount - 20

  return (
    <div className="w-full">
      <EditTextarea
        style={{ border: 0, outline: 0 }}
        rows={rows}
        readonly={readonly}
        inputClassName={inputClassName}
        className={classNames(className, !value && 'text-opacity-50')}
        placeholder={placeholder}
        value={value}
        onEditMode={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onChange={(e) => handleChange(e.target.value)}
        onSave={({ value }) => handleSave(value)}
      />
      <div
        className={classNames(
          'text-sm  text-right font-semibold transition',
          isEditing ? 'opacity-100' : 'opacity-50',
          isOverCharCount
            ? 'text-red-600'
            : isApproachingCharCount
            ? 'text-amber-600'
            : 'text-emerald-300'
        )}
      >
        {charCount}/{maxCharCount}
      </div>
    </div>
  )
}
