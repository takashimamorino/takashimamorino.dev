import { remark } from "remark";
import html from "remark-html";
import { createHighlighter, type Highlighter } from "shiki";
import type { Post, PostMetadata } from "../types/blog";

// Simple frontmatter parser that works in browser
function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatterContent, markdownContent] = match;
  const data: Record<string, any> = {};

  // Parse YAML-like frontmatter (simple key: value pairs)
  frontmatterContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim();
      data[key.trim()] = value;
    }
  });

  return { data, content: markdownContent };
}

// Highlighter singleton
let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["catppuccin-mocha"],
      langs: [
        "javascript",
        "typescript",
        "tsx",
        "jsx",
        "html",
        "css",
        "json",
        "markdown",
        "bash",
        "yaml",
      ],
    });
  }
  return highlighterPromise;
}

// Decode HTML entities
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&#x27;": "'",
  };
  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

// Import all markdown files from posts directory
const postModules = import.meta.glob("/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export async function getAllPosts(): Promise<PostMetadata[]> {
  const posts: PostMetadata[] = [];

  for (const [path, content] of Object.entries(postModules)) {
    if (typeof content !== "string") continue;

    const { data } = parseFrontmatter(content);
    const slug = path.replace("/posts/", "").replace(".md", "");

    posts.push({
      slug,
      title: data.title || "Untitled",
      publishedAt: data.publishedAt || new Date().toISOString(),
    });
  }

  // Sort by publication date (newest first)
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const path = `/posts/${slug}.md`;
  const content = postModules[path];

  if (!content || typeof content !== "string") {
    return null;
  }

  const { data, content: markdownContent } = parseFrontmatter(content);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(markdownContent);
  let htmlContent = processedContent.toString();

  // Apply syntax highlighting to code blocks
  const highlighter = await getHighlighter();
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
  const codeBlocks = [...htmlContent.matchAll(codeBlockRegex)];

  for (const match of codeBlocks) {
    const [fullMatch, lang, code] = match;
    const decodedCode = decodeHTMLEntities(code);

    try {
      const highlighted = await highlighter.codeToHtml(decodedCode, {
        lang: lang || "text",
        theme: "catppuccin-mocha",
      });
      htmlContent = htmlContent.replace(fullMatch, highlighted);
    } catch (error) {
      console.error(`Failed to highlight code block with language: ${lang}`, error);
      // Keep the original code block if highlighting fails
    }
  }

  return {
    slug,
    title: data.title || "Untitled",
    publishedAt: data.publishedAt || new Date().toISOString(),
    content: markdownContent,
    htmlContent,
  };
}
