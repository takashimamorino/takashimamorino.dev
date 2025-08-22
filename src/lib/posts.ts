import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { createHighlighter } from "shiki";

export type PostMetadata = {
  title: string;
  published: string;
  slug: string;
};

export type Post = PostMetadata & {
  content: string;
  htmlContent: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

let highlighterPromise: Promise<any> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["catppuccin-mocha"],
      langs: ["javascript", "typescript", "tsx", "jsx", "html", "css", "json", "markdown"],
    });
  }
  return highlighterPromise;
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const files = await fs.readdir(postsDirectory);
  const slugs = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        published: data.published || new Date().toISOString(),
      };
    }),
  );

  return posts.sort((a, b) => {
    const dateA = new Date(a.published);
    const dateB = new Date(b.published);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const highlighter = await getHighlighter();

  // First convert markdown to HTML
  const processedContent = await remark().use(html, { sanitize: false }).process(content);

  let htmlContent = processedContent.toString();

  // Then process code blocks with Shiki
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
  const matches = Array.from(htmlContent.matchAll(codeBlockRegex));

  for (const match of matches) {
    const [fullMatch, lang, code] = match;
    const decodedCode = code
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    try {
      const highlighted = await highlighter.codeToHtml(decodedCode, {
        lang: lang || "text",
        theme: "catppuccin-mocha",
      });
      htmlContent = htmlContent.replace(fullMatch, highlighted);
    } catch (error) {
      console.error(`Error highlighting ${lang} code:`, error);
    }
  }

  return {
    slug,
    title: data.title || slug,
    published: data.published || new Date().toISOString(),
    content,
    htmlContent,
  };
}
