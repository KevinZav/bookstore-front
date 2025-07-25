import type { Author } from '../../domain';
import type { LibraryDatasource } from '../../domain/datasources/library.datasource';
import type { Book } from '../../domain/entities/book';
import { LibraryRepository } from '../../domain/repositories/library-repository';

export class LibraryRepositoryImpl extends LibraryRepository {
  private datasource: LibraryDatasource;

  constructor(datasource: LibraryDatasource) {
    super();

    this.datasource = datasource;
  }

  createAuthor(author: Author): Promise<Author> {
    return this.datasource.createAuthor(author);
  }

  getAllAuthors(): Promise<Author[]> {
    return this.datasource.getAllAuthors();
  }

  createBook(book: Book): Promise<Book> {
    return this.datasource.createBook(book);
  }

  getAllBooks(): Promise<Book[]> {
    return this.datasource.getAllBooks();
  }

  importBooks(file: File): Promise<void> {
    return this.datasource.importBooks(file);
  }
}