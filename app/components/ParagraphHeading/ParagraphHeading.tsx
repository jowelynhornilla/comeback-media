import { ParagraphHeadingProps } from "./ParagraphHeader.types";
import cn from "classnames";

export const ParagraphHeading = ({
  children,
  className,
}: ParagraphHeadingProps) => {
  return (
    <div className={cn("typography-xl font-regular text-brand-tertiary", className)}>
      {children}
    </div>
  );
};
