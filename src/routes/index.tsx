import { createFileRoute } from "@tanstack/react-router";
import { getAllPosts } from "../lib/posts";

export const Route = createFileRoute("/")({
  loader: async () => {
    const posts = await getAllPosts();
    return { posts };
  },
});
