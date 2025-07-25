import * as Yup from "yup";

export const authorSchema = Yup.object({
  name: Yup.string().required("Nombre obligatorio"),
  birthdate: Yup.date().required("Fecha de nacimiento obligatoria"),
});
