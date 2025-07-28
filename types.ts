
export interface BlogPostSummary {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
}

export interface BlogPostFull {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  publishDate: string;
}
