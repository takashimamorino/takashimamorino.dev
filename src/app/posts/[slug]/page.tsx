import { getPost } from "../../../lib/posts";

type PageProps = {
  slug: string;
};

export default async function PostPage({ slug }: PageProps) {
  try {
    const post = await getPost(slug);
    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl mb-2">{post.title}</h1>
          <time className="text-gray-500 text-sm">
            {new Date(post.published)
              .toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, "/")}
          </time>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </article>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <a href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to home
        </a>
      </div>
    );
  }
}
