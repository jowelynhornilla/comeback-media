import { DividerProps } from "./Divider.types";
import cn from "classnames";

export const Divider = ({ className }: DividerProps) => {
  return <div className={cn("h-[1px] bg-border-secondary w-full", className)} />;
};
