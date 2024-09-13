import { Blog } from "@/app/types";
import { delay } from "../helpers";
import mockBlogs from "../mocks/blogs.json";

export const getBlog = async (slug: string): Promise<Blog | null> => {
  try {
    await delay(3000);

    const blogs = mockBlogs as Blog[];

    const blog = blogs.find((blog) => blog.slug === slug);

    if (!blog) {
      return null;
    }

    const nextBlog = getNextBlog(blogs, slug);

    return {
      ...blog,
      nextBlog: { slug: nextBlog.slug, title: nextBlog.title },
    };
  } catch (error) {
    console.error(`Failed to fetch blog with slug ${slug}:`, error);
    throw error;
  }
};

const getNextBlog = (blogs: Blog[], slug: string): Blog => {
  const blogIndex = blogs.findIndex((blog) => blog.slug === slug);
  return blogs[blogIndex + 1] || blogs[0];
};
