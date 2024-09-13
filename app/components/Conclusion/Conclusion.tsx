import { ConclusionProps } from "./Conclusion.types";
import cn from "classnames";

export const Conclusion = ({ children, className }: ConclusionProps) => {
  return (
    <div className={cn("rounded-2xl p-4xl bg-secondary rounded-2xl space-y-5", className)}>
      <div className="typography-display-sm font-semibold text-brand-primary">Conclusion</div>
      <div className="typography-lg font-regular text-brand-tertiary">{children}</div>
    </div>
  );
};
