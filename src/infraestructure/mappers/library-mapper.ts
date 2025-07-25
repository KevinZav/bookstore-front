import type { Author } from "../../domain";
import type { Book } from "../../domain/entities/book";
import type { AuthorBody, AuthorPayload, BookBody } from "../models";

export class LibraryMapper {
  public static authorToPayload(author: Author): AuthorPayload {
    return {
      name: author.name,
      birthDate: new Date(author.birthdate).toISOString()
    };
  }

  public static responseToAuthor(payload: AuthorPayload): Author {
    return {
      id: payload.id,
      name: payload.name,
      birthdate: payload.birthDate
    };
  }

  public static authorToBody(author: Author): AuthorBody {
    return {
      name: author.name,
      birthdate: new Date(author.birthdate).toISOString()
    };
  }

  public static bookToBody(book: Book): BookBody {
    return {
      authorId: book.authorId,
      isbn: book.isbn,
      pages: book.pages,
      title: book.title,
      coverUrl: book.coverUrl
    }
  }

  public static bodyToBook(body: BookBody): Book {
    return {
      ...body
    };
  }
}