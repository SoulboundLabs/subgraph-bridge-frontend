import { ReactElement } from "react";
import { Icon } from "tabler-icons-react";
interface Props {
  options?: Option<string>[];
  label?: string | ReactElement;
  helpText?: string;
  onChange?: (selected: string) => void;
  value?: string;
  Icon?: Icon;
  disabled?: boolean;
}

export function SelectDropdown({
  options,
  label,
  Icon,
  value,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="items-center w-full text-sm">
      <select className="w-full">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
