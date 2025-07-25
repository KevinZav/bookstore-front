export interface AuthorPayload {
  id?: string;
  name: string;
  birthDate: string;
}

export interface AuthorBody {
  name: string;
  birthdate: string;
}

export interface BookBody {
  id?: string;
  title: string;
  isbn: string;
  pages: number;
  authorId: string;
  coverUrl?: string;
}