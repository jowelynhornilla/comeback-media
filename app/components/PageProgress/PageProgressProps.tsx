"use client";

import { PageProgressProps } from "./PageProgressBarProps.types";

export const PageProgress = ({ scrollProgress = 0 }: PageProgressProps) => {
  return (
    <div className="h-2 w-full fixed top-0 right-0 left-0 z-40">
      <div
        className="h-full bg-brand-secondary"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
};
