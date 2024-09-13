import { ParagraphProps } from "./Paragraph.types";
import cn from "classnames";

export const Paragraph = ({ children, className }: ParagraphProps) => {
  return (
    <p className={cn("typography-lg font-regular text-brand-tertiary", className)}>{children}</p>
  );
};
