import { useEffect, useState } from "react";

export const usePageProgress = ({
  ref,
}: {
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const updateProgress = () => {
      const { top, height } = element.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      if (top >= windowHeight) {
        setProgress(0);
      } else if (top + height <= 0) {
        setProgress(1);
      } else {
        const visibleHeight = Math.min(height, windowHeight);
        const invisibleHeight = height - visibleHeight;

        const scrolled = Math.max(0, -top);
        const newProgress = scrolled / invisibleHeight;

        setProgress(Math.min(1, Math.max(0, newProgress)));
      }
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    progress,
  };
};
