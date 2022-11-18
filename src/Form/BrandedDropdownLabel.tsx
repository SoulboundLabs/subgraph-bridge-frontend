export const BrandedDropdownLabel = ({ label, sublabel }) => {
  return (
    <div>
      <div>{label}</div>
      <div className="text-xs text-slate-400">{sublabel}</div>
    </div>
  )
}
