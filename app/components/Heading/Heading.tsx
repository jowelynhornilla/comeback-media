import { HeadingProps } from "./Heading.types";
import cn from "classnames";

export const Heading = ({ children, className }: HeadingProps) => {
  return <div className={cn("typography-display-sm font-semibold text-brand-primary", className)}>{children}</div>;
};
