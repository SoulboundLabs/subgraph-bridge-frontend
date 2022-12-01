import { RadioGroup } from "@headlessui/react";
import { Button } from "../Button/Button";

interface Props<T> {
  options?: Option<T>[];
  label?: string;
  helpText?: string;
  onChange?: (option: T) => void;
  value?: T;
  size?: string;
}

export function RadioButtons<T>({
  value,
  options,
  label,
  helpText,
  onChange,
  size = "xs",
}: Props<T>) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <h2 className="font-semibold">{label}</h2>
          <a
            href="#"
            className="text-sm font-medium text-sky-300 hover:underline"
          >
            {helpText}
          </a>
        </div>
      )}

      <RadioGroup
        value={value}
        onChange={(value) => {
          onChange(value);
        }}
      >
        <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <RadioGroup.Option value={option.value}>
              {({ checked }) => (
                <RadioGroup.Label as="span">
                  <Button
                    className={size === "xs" && "pr-2.5"}
                    size={size}
                    label={option.label}
                    palette={checked ? "secondary" : "primary"}
                  />
                </RadioGroup.Label>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
