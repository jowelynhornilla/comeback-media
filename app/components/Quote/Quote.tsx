import { QuoteProps } from "./QuoteProps.types";
import cn from "classnames";

export const Quote = ({ content, author, className }: QuoteProps) => {
  return (
    <div className={cn("space-y-2xl", className)}>
      <div className="typography-display-xs font-medium italic text-brand-primary">{content}</div>
      {!!author && <div className="typography-md font-regular text-brand-tertiary">— {author}</div>}
    </div>
  );
};
