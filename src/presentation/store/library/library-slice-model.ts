import type { Author, StatusType } from "../../../domain"
import type { Book } from "../../../domain/entities/book"

export interface LibrarySliceProps {
  authors: {
    status: StatusType,
    data: Author[]
  },
  books: {
    status: StatusType,
    data: Book[]
  }
}