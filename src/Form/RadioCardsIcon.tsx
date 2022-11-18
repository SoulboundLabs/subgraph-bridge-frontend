import { RadioGroup } from "@headlessui/react";
import { ImageWithLabel } from "../Image/ImageWithLabel";
import { classNames } from "../lib/utils";
import { Option } from "../store/types";

interface Props<T> {
  options?: Option<T>[];
  label?: string;
  helpText?: string;
  onChange?: (option: T) => void;
  wrapperClassName?: string;
  value?: T;
}

export function RadioCardsIcon<T>({
  value,
  options,
  label,
  helpText,
  onChange,
  wrapperClassName,
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
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
        <div className={classNames("flex flex-wrap gap-8", wrapperClassName)}>
          {options.map(({ imgSrc, Icon, value, label, comingSoon }) => (
            <RadioGroup.Option
              key={value.toString()}
              disabled={comingSoon}
              value={value}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer focus:outline-none",
                  !comingSoon ? "hover:opacity-100" : "",
                  checked ? "opacity-100" : "opacity-40",

                  comingSoon
                    ? "opacity-40 hover:opacity-40 cursor-not-allowed"
                    : "",
                  " "
                )
              }
            >
              <RadioGroup.Label as="span" className="text-center">
                {imgSrc && (
                  <ImageWithLabel
                    key={value.toString()}
                    imgSrc={imgSrc}
                    label={label}
                    opacity={true}
                    filter={true}
                  />
                )}
                {Icon && (
                  <div className="mb-8 text-center flex-col justify-center">
                    <Icon strokeWidth={1.5} className="w-16 h-16 mx-auto" />
                    {label && (
                      <div className="uppercase mt-1 text-xs font-bold tracking-wide text-slate-400 group-hover:text-white transition">
                        {label}
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
