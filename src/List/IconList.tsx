import { Icon } from "tabler-icons-react";
import { ArrowRightGradient } from "../Gradient/GradientSVGs";

interface Props {
  items: any[];
  horizontal?: boolean;
  Icon?: Icon;
}

export const IconList = ({
  Icon = ArrowRightGradient,
  items,
  horizontal,
}: Props) => {
  return (
    <ul className={horizontal ? "flex gap-2" : "space-y-2"}>
      {items.map((item, index) => {
        return (
          <li key={index} className="flex gap-2 justify-start items-start">
            <div className="flex-none">
              <Icon />
            </div>
            <div className="flex-1">{item}</div>
          </li>
        );
      })}
    </ul>
  );
};
