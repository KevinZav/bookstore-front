import { Button, Dialog, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { authorSchema, type Author } from "../../../domain";
import { Form, Formik, useFormik } from "formik";

interface Props {
  open: boolean;
  closeAction: () => void;
  primaryButton: (values: Author) => void;
}

export const CreateAuthor = ({ open, closeAction, primaryButton }: Props) => {
  const initialValues: Author = {
    name: "",
    birthdate: "",
  };

  const onSubmit = async () => {
    setTouched({ name: true, birthdate: true }, true);
    
    validateForm(values).then((errors) => {
      if (hasErrors(errors)) return;
      primaryButton(values);
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: authorSchema,
  });
  const { values, handleBlur, errors, touched, setTouched, validateForm } =
    formik;

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
        <Grid sx={{ width: "400px" }}>
          <Typography variant="h6" textAlign="center" marginBottom={3}>Nuevo autor</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={authorSchema}
            onSubmit={onSubmit}
          >
            <Form>
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
              <Grid size={12} marginBottom={3}>
                <TextField
                  type="date"
                  size="small"
                  label="Fecha de nacimiento"
                  name="birthdate"
                  value={values.birthdate}
                  onChange={formik.handleChange}
                  onBlur={handleBlur}
                  error={touched.birthdate && Boolean(errors.birthdate)}
                  helperText={touched.birthdate && errors.birthdate}
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
      </DialogContent>
    </Dialog>
  );
};
