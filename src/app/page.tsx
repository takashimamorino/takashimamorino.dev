import { getAllPosts } from "../lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-12">
        <section>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-6 last:border-0">
                  <a href={`/posts/${post.slug}`} className="group block">
                    <h3 className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <time className="text-gray-500 text-sm">
                      {new Date(post.published)
                        .toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\//g, "/")}
                    </time>
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
