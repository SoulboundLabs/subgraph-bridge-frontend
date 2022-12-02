import { classNames } from "../lib/utils";
import { Status } from "../store/types";

interface Props {
  status: Status;
  extra?: React.ReactNode;
}

export const statusMap: Record<
  Status,
  {
    label: string;
    color: string;
    bgColor: string;
  }
> = {
  [Status.Frozen]: {
    label: "Frozen",
    bgColor: "bg-sky-100",
    color: "text-sky-800",
  },
  [Status.Pending]: {
    label: "Pending",
    bgColor: "bg-yellow-100",
    color: "text-yellow-800",
  },
  [Status.Certified]: {
    label: "Certified",
    bgColor: "bg-green-100",
    color: "text-green-800",
  },
  [Status.Disputed]: {
    label: "Disputed",
    bgColor: "bg-red-100",
    color: "text-red-800",
  },
};

export function StatusBadge({ status, extra }: Props) {
  const { label, bgColor, color } = statusMap[status];
  return (
    <>
      <span
        className={classNames(
          `inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-medium`,
          bgColor,
          color
        )}
      >
        {label}
        {extra ? <span> &middot; {extra}</span> : null}
      </span>
    </>
  );
}
