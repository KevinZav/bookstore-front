import * as Yup from "yup";

export const bookSchema = Yup.object({
  title: Yup.string().required("Titulo obligatorio"),
  isbn: Yup.string().required("ISBN obligatorio"),
  pages: Yup.number().min(1, 'El número de paginas debe ser mayor a cero').required("Número de páginas obligatorio"),
  authorId: Yup.number().required("Precio obligatorio"),
});
