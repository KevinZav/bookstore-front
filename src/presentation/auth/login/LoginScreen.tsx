import { Button, Grid, TextField } from "@mui/material";
import { authSchema, type AuthUser } from "../../../domain";
import { Form, Formik, useFormik } from "formik";

interface Props {
  primaryButton: (values: AuthUser) => void;
  secondaryButton: () => void;
}

export const LoginScreen = ({ primaryButton, secondaryButton }: Props) => {
  const initialValues: AuthUser = {
    username: "",
    password: "",
  };

  const onSubmit = async () => {
    setTouched({ username: true, password: true }, true);

    validateForm(values).then((errors) => {
      if (hasErrors(errors)) return;
      primaryButton(values);
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: authSchema,
  });
  const { values, handleBlur, errors, touched, setTouched, validateForm } =
    formik;

  const hasErrors = (errors: any) => {
    return Object.keys(errors).length > 0;
  };

  return (
    <Grid size={12} sx={{ width: "444px" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={authSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Grid size={12} marginBottom={2}>
            <TextField
              size="small"
              label="Correo electrónico"
              name="username"
              value={values.username}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              fullWidth
            ></TextField>
          </Grid>
          <Grid size={12} marginBottom={3}>
            <TextField
              type="password"
              size="small"
              label="Contraseña"
              name="password"
              value={values.password}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
            ></TextField>
          </Grid>
          <Grid size={12} marginBottom={1}>
            <Button variant="contained" fullWidth onClick={onSubmit}>
              Ingresar
            </Button>
          </Grid>
          <Grid size={12}>
            <Button variant="text" fullWidth onClick={secondaryButton}>
              Registrarse
            </Button>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};
