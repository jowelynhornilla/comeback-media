import Image from "next/image";
import mockBlogs from "./mocks/blogs.json";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-4xl mx-auto py-9xl paragraph-max-width mx-auto space-y-6">
      <div className="typography-display-lg">Blogs</div>
      <div className="w-full space-y-4">
        {mockBlogs.map((blog, index) => {
          return (
            <Link
              key={index}
              href={`/blogs/${blog.slug}`}
              className="flex h-48 shadow-lg hover:shadow-xl transition-all ease-in-out cursor-pointer"
            >
              <div className="w-1/3 relative" key={index}>
                <Image
                  src={blog.featuredImage.url}
                  layout="fill"
                  alt="blog image"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1 space-y-2 flex justify-center px-4 flex-col">
                <div className="typography-display-xs">{blog.title}</div>
                <div className="typography-md">{blog.subtitle}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
