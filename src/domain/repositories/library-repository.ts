import type { Author } from "../entities";
import type { Book } from "../entities/book";

export abstract class LibraryRepository {
  abstract createAuthor(author: Author): Promise<Author>;
  abstract getAllAuthors(): Promise<Author[]>;
  abstract createBook(book: Book): Promise<Book>;
  abstract getAllBooks(): Promise<Book[]>;
  abstract importBooks(file: File): Promise<void>;
}