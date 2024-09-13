"use client";

import {
  BlogImage,
  Conclusion,
  Divider,
  Heading,
  Paragraph,
  ParagraphHeading,
  Quote
} from "@/app/components";
import { BLOG_BODY_COMPONENT_SPACING_MAP } from "@/app/config";
import { usePageProgress } from "@/app/hooks/usePageProgress";
import { Blog } from "@/app/types";
import cn from "classnames";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const BlogPage = ({
  blog,
  onProgressChange,
}: {
  blog: Blog;
  onProgressChange?: (progress: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = usePageProgress({
    ref,
  });

  useEffect(() => {
    onProgressChange?.(progress);
  }, [progress]);

  return (
    <div ref={ref}>
      <div className="flex w-full">
        <div className="flex flex-col flex-1 justify-center space-y-6xl px-4xl">
          <div className="space-y-xl mr-4xl">
            <div className="space-y-3xl">
              <div className="typography-md font-semibold text-brand-secondary">
                20 Jan 2024 • 10 min read
              </div>
              <div className="typography-display-2xl font-semibold text-brand-primary">
                {blog.title}
              </div>
            </div>
            <div className="typography-xl font-regular  text-brand-tertiary">
              {blog.subtitle}
            </div>
          </div>
          <div className="flex gap-xl">
            <Image
              width={56}
              height={56}
              className="rounded-full"
              src={blog.author.avatar.url}
              alt="Hero"
              objectFit="cover"
            />
            <div>
              <div className="typography-lg font-semibold text-brand-primary">
                {blog.author.name}
              </div>
              <div className="typography-md font-regular text-brand-tertiary">
                {blog.author.role}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative aspect-square">
          <Image
            src={blog.featuredImage.url}
            alt="featured image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="py-9xl paragraph-max-width mx-auto">
        {blog.body.map((section, index) => {
          const spacing = BLOG_BODY_COMPONENT_SPACING_MAP[section.type];

          const isEven = index % 2 === 0;

          const isDivider = section.type === "divider";
          const isFirstSection = index === 0;
          const isLastSection = index === blog.body.length - 1;

          const hasMarginTop = !isFirstSection && (isEven || isDivider);
          const hasMarginBottom =
            !isLastSection && !isFirstSection && (isEven || isDivider);

          const className = cn({
            [spacing.marginTop]: hasMarginTop,
            [spacing.marginBottom]: hasMarginBottom,
          });

          switch (section.type) {
            case "p":
              return (
                <Paragraph key={index} className={className}>
                  {section.content}
                </Paragraph>
              );

            case "divider":
              return <Divider key={index} className={className} />;

            case "h2":
              return (
                <Heading key={index} className={className}>
                  {section.content}
                </Heading>
              );

            case "h3":
              return (
                <ParagraphHeading key={index} className={className}>
                  {section.content}
                </ParagraphHeading>
              );

            case "img":
              return (
                <BlogImage
                  key={index}
                  className={className}
                  src={section.url}
                  height={section.height}
                  alt={`${section.caption}`}
                  caption={section.caption}
                />
              );

            case "quote":
              return (
                <Quote
                  key={index}
                  className={className}
                  content={section.content}
                  author={section.author}
                />
              );
          }
        })}
        {!!blog.conclusion && (
          <Conclusion className="mt-12">{blog.conclusion}</Conclusion>
        )}
      </div>
    </div>
  );
};
