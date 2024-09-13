import { getBlog } from "@/app/services";
import { Suspense } from "react";
import { Container } from "./Container";
import Loading from "./loading";

export default async function Blog({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return (
      <div className="fixed inset-0 flex items-center justify-center typography-display-2xl">
        Blog Not Found
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className="max-w-4xl mx-auto w-full">
        <Container blog={blog} />
      </main>
    </Suspense>
  );
}
