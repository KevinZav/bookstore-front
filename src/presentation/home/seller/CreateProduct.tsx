import { Button, Dialog, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import type { Product } from "../../../domain";
import { productSchema } from "../../../domain/schemas/product-schema";

interface Props {
  open: boolean;
  closeAction: () => void;
  primaryButton: (values: Omit<Product, 'id'>) => void
}
export const CreateProduct = ({ open, closeAction, primaryButton }: Props) => {
  const initialValues: Omit<Product, 'id'> = {
    name: '',
    price: 0,
    quantity: 0,
    sku: '',
  };

  const onSubmit = () => {
    setTouched({ name: true, price: true, quantity: true, sku: true }, true);
    
    validateForm(values).then((errors) => {
      if (hasErrors(errors)) return;
      primaryButton(values);
    });
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: productSchema
  })
  const { values, handleBlur, errors, touched, setTouched, validateForm } = formik;

  const hasErrors = (errors: any) => {
      return Object.keys(errors).length > 0;
    };

  return (
    <Dialog
      maxWidth="xs"
      onClose={closeAction}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Grid
          size={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom={4}
        >
          <Typography variant="h5" marginLeft={1}>
            Crear Producto
          </Typography>
        </Grid>
        <Grid container>
          <Grid size={12} sx={{ width: "444px" }}>
            <Formik
              initialValues={initialValues}
              validationSchema={productSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <Grid size={12} marginBottom={2}>
                  <TextField
                    size="small"
                    label="SKU"
                    name="sku"
                    value={values.sku}
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    error={touched.sku && Boolean(errors.sku)}
                    helperText={touched.sku && errors.sku}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid size={12} marginBottom={2}>
                  <TextField
                    size="small"
                    label="Nombre"
                    name="name"
                    value={values.name}
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid size={12} marginBottom={2}>
                  <TextField
                    type="number"
                    size="small"
                    label="Precio"
                    name="price"
                    value={values.price}
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid size={12} marginBottom={3}>
                  <TextField
                    type="number"
                    size="small"
                    label="Cantidad"
                    name="quantity"
                    value={values.quantity}
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid size={12} marginBottom={1}>
                  <Button variant="contained" fullWidth onClick={onSubmit}>
                    Crear
                  </Button>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
