"use client";

import { PageProgress } from "@/app/components";
import { usePromise } from "@/app/hooks/usePromise";
import { getBlog } from "@/app/services";
import { Blog } from "@/app/types";
import { useState } from "react";
import { BlogPage } from "./BlogPage";
import Loading from "./loading";

const SCROLL_LOAD_THRESHOLD = 0.98;

export const Container = ({ blog }: { blog: Blog }) => {
  const [blogList, setBlogList] = useState<Blog[]>([blog]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const fetchNextBlog = usePromise({
    promiseFunction: async (blogSlug?: string) => {
      if (!blogSlug || blogList.some((blog) => blog.slug === blogSlug)) return;

      const blog = await getBlog(blogSlug);
      if (blog) {
        setBlogList((prevBlogs) => [...prevBlogs, blog]);
      }
    },
  });

  return (
    <>
      {fetchNextBlog.pending && <Loading />}
      <PageProgress scrollProgress={scrollProgress} />
      {blogList.map((blog, index) => (
        <BlogPage
          key={index}
          blog={blog}
          onProgressChange={(progress) => {
            if (
              fetchNextBlog.pending ||
              blogList.some((blog) => blog.nextBlog?.slug === blog.slug)
            ) {
              return;
            }

            if (scrollProgress >= SCROLL_LOAD_THRESHOLD) {
              setScrollProgress(0);
              fetchNextBlog.call(blog.nextBlog?.slug);
            } else {
              setScrollProgress(progress);
            }
          }}
        />
      ))}
    </>
  );
};
