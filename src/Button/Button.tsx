// import { Button, FrameHexagon } from "@arwes/core";
import { ReactNode } from "react";
import { Icon } from "tabler-icons-react";
import { classNames } from "../lib/utils";

interface CTAButtonProps {
  Icon?: Icon;
  label: string | ReactNode;
  palette?: string;
  className?: string;
  frame?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  stretch?: boolean;
  animated?: boolean;
  groupHover?: boolean;
  disabled?: boolean;
  reverse?: boolean;
  onClick?: () => void;
  textButton?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  Icon,
  label,
  type = "button",
  reverse,
  disabled,
  palette = "primary",
  size = "md",
  groupHover,
  className,
  onClick,
  stretch,
}: CTAButtonProps) => {
  const sizeStyles = {
    xs: "gap-1 h-6 pr-1.5 pl-2.5 text-sm",
    sm: "gap-1 h-9 pr-2 pl-2.5",
    md: "gap-1 h-9 pr-2 pl-2.5",
    lg: "gap-2 h-10 pr-3 pl-3.5 text-base",
    xl: "gap-2 h-14 pr-6 pl-6 text-lg",
  };
  const roundedStyles = {
    xs: "rounded",
    sm: "rounded-lg",
    md: "rounded-lg",
    lg: "rounded-lg",
    xl: "rounded-lg",
  };
  const iconSize = {
    xs: "h-4 w-4",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
    xl: "w-7 h-7",
  };
  return (
    <button
      disabled={disabled}
      className={classNames(
        stretch ? "w-full" : "w-auto",
        reverse ? "flex-row-reverse" : "flex-row",
        palette === "primary"
          ? "bg-slate-700/50 hover:bg-slate-600/50 text-white"
          : palette === "danger"
          ? "bg-red-500 hover:bg-red-400 text-white"
          : " text-white  bg-sky-600 hover:bg-sky-400",
        palette === "primary" && groupHover && "group-hover:bg-slate-600/50",
        sizeStyles[size],
        roundedStyles[size],
        `flex  nodrag font-semibold disabled:opacity-50 disabled:cursor-not-allowed  transition justify-center whitespace-nowrap items-center`,
        className
      )}
      type={type}
      onClick={onClick}
    >
      {Icon && <Icon className={classNames(iconSize[size])} />}
      {label}
    </button>
  );
};
