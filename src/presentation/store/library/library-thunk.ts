import type { Author, StatusType } from "../../../domain";
import type { Book } from "../../../domain/entities/book";
import { LibraryDatasourceBook } from "../../../infraestructure";
import { LibraryRepositoryImpl } from "../../../infraestructure/repositories/library-repository-impl";
import type { store } from "../store";
import { createAuthor, createBook, creatingBook, errorAuthors, errorBooks, getAuthors, getBooks, loadingAuthors } from "./library-slice";

export type LibraryDispatch = typeof store.dispatch;

export class LibraryThunk {
  private static readonly repository = new LibraryRepositoryImpl(new LibraryDatasourceBook());

  public static startCreate(payload: Author) {
      return async (dispatch: LibraryDispatch) => {
        try {
          const author = await this.repository.createAuthor(payload);
          dispatch(createAuthor(author));
        } catch (e) {
          dispatch(errorAuthors())
        }
      }
  }

  public static startGetAuthors() {
    return async (dispatch: LibraryDispatch) => {
      try {
        dispatch(loadingAuthors());
        const authors = await this.repository.getAllAuthors();
        dispatch(getAuthors(authors));
      } catch (e) {
        dispatch(errorAuthors())
      }
    }
  }

  public static startCreateBook(payload: Book, action?: (status: StatusType) => void) {
    return async (dispatch: LibraryDispatch) => {
      try {
        dispatch(creatingBook());
        const book = await this.repository.createBook(payload);
        dispatch(createBook(book));
        if (action){
          action('success');
        }
      } catch (e) {
        dispatch(errorBooks())
        if (action) {
          action('error');
        }
      }
    }
  }

  public static startGetBooks() {
    return async (dispatch: LibraryDispatch) => {
      try {
        const books = await this.repository.getAllBooks();
        dispatch(getBooks(books));
      } catch (e) {
        dispatch(errorBooks())
      }
    }
  }

  public static startUploadCSVFile(file: File, action: (status: StatusType) => void) {
    return async (dispatch: LibraryDispatch) => {
      try {
        await this.repository.importBooks(file);
        const books = await this.repository.getAllBooks();
        dispatch(getBooks(books));
        action('success');
      } catch (e) {
        dispatch(errorBooks());
        action('error');
      }
    }
  }
}