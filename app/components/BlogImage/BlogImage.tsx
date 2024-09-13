// import Image from "next/image";
import { BlogImageProps } from "./BlogImage.types";
import cn from "classnames";

export const BlogImage = ({ src, alt, caption, height, className }: BlogImageProps) => {
  return (
    <div className={cn("space-y-xl relative", className)}>
      <img className="object-cover rounded-xl" src={src} alt={alt} width="100%" height={height} />
      {!!caption && <div className="typography-sm font-regular text-brand-tertiary">{caption}</div>}
    </div>
  );
};
