import type { Author } from "../../domain";
import { LibraryDatasource } from "../../domain/datasources/library.datasource";
import type { Book } from "../../domain/entities/book";
import { MarketConnection } from "../connection";
import { LibraryMapper } from "../mappers/library-mapper";
import type { AuthorPayload, BookBody } from "../models";

export class LibraryDatasourceBook extends LibraryDatasource {
  async createAuthor(author: Author): Promise<Author> {
    const payload = LibraryMapper.authorToBody(author);
    const response = await MarketConnection.connect.post<AuthorPayload>(
      "/authors",
      payload
    );

    return LibraryMapper.responseToAuthor(response.data);
  }

  async getAllAuthors(): Promise<Author[]> {
    const response = await MarketConnection.connect.get<AuthorPayload[]>(
      "/authors"
    );

    return response.data.map((item) => LibraryMapper.responseToAuthor(item));
  }

  async createBook(book: Book): Promise<Book> {
    const payload = LibraryMapper.bookToBody(book);
    const response = await MarketConnection.connect.post<BookBody>('/books', payload);


    return LibraryMapper.bodyToBook(response.data);
  }

  async getAllBooks(): Promise<Book[]> {
    const response = await MarketConnection.connect.get<BookBody[]>('/books');
    
    return response.data.map((item) => LibraryMapper.bodyToBook(item));
  }

  async importBooks(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await MarketConnection.connect.post('/books/upload-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response);
  }
}
