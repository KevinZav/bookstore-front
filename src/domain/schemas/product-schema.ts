import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string().required("Nombre obligatorio"),
  sku: Yup.string().required("SKU obligatorio"),
  quantity: Yup.number().required("Cantidad obligatoria"),
  price: Yup.number().required("Precio obligatorio"),
});
