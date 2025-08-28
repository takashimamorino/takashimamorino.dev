import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/posts/$slug")({
  component: PostDetail,
  errorComponent: PostNotFound,
});

function PostDetail() {
  const { post } = Route.useLoaderData();

  return (
    <article className="container mx-auto max-w-4xl px-6 py-8">
      <header className="mb-8">
        <h1 className="text-2xl text-gray-900">{post.title}</h1>
        <time className="text-sm text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
        </time>
      </header>

      <div
        className="prose prose-base max-w-none"
        dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
      />
    </article>
  );
}

function PostNotFound() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      <p className="text-gray-500 mb-4">投稿が見つかりませんでした。</p>
      <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
        ← ホームに戻る
      </Link>
    </div>
  );
}
