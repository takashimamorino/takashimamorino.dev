import { createFileRoute } from "@tanstack/react-router";
import { getPost } from "../../lib/posts";

export const Route = createFileRoute("/posts/$slug")({
  loader: async ({ params }) => {
    const post = await getPost(params.slug);
    if (!post) {
      throw new Error("Post not found");
    }
    return { post };
  },
});
