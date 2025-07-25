export interface Book {
  id?: string;
  title: string;
  isbn: string;
  pages: number;
  authorId: string;
  coverUrl?: string;
  authorName?: string;
}