export interface PostMetadata {
  slug: string;
  title: string;
  publishedAt: string;
}

export interface Post extends PostMetadata {
  content: string;
  htmlContent?: string;
}
