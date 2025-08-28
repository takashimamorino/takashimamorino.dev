import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      {posts.length === 0 ? (
        <p className="text-gray-500">投稿はまだありません。</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to="/posts/$slug" params={{ slug: post.slug }} className="block group">
                <article className="py-4 border-b border-gray-100 hover:bg-gray-50 -mx-2 px-2 transition-colors">
                  <h2 className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
                  </time>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
