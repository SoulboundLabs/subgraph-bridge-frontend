import { classNames } from "../lib/utils";
interface Props {
  imgSrc: string;
  label?: string | React.ReactNode;
  filter?: boolean;
  opacity?: boolean;
  size?: string;
}

export const ImageWithLabel = ({
  imgSrc,
  label = "",
  filter = false,
  opacity = false,
  size = "16",
}: Props) => {
  return (
    <div className={`w-${size}`}>
      <img
        className={classNames(
          filter && "filter invert",
          opacity && "opacity-50 group-hover:opacity-100 transition",
          size ? `w-${size} h-${size}` : "",
          `inline-block mb-3`
        )}
        src={imgSrc}
      />
      {label && (
        <div className="uppercase text-xs font-bold tracking-wide text-slate-400 group-hover:text-white transition">
          {label}
        </div>
      )}
    </div>
  );
};
