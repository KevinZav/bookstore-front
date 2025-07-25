import { Button, Grid, TextField } from "@mui/material";
import { userSchema, type User } from "../../../domain";
import { Form, Formik, useFormik } from "formik";

interface Props {
  primaryButton: (values: User) => void;
  secondaryButton: () => void;
}

export const SignScreen = ({ primaryButton, secondaryButton }: Props) => {
  const initialValues: User = {
    email: "",
    name: "",
    password: "",
    validatePassword: "",
  };

  const onSubmit = async () => {
    setTouched(
      { name: true, email: true, password: true, validatePassword: true },
      true
    );

    validateForm(values).then((errors) => {
      if (hasErrors(errors)) return;
      primaryButton(values);
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: userSchema,
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
        validationSchema={userSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Grid size={12} marginBottom={2}>
            <TextField
              size="small"
              label="Correo electrónico"
              name="email"
              value={values.email}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />
          </Grid>
          <Grid size={12} marginBottom={2}>
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
            />
          </Grid>
          <Grid size={12} marginBottom={3}>
            <TextField
              type="password"
              size="small"
              label="Validar contraseña"
              name="validatePassword"
              value={values.validatePassword}
              onChange={formik.handleChange}
              onBlur={handleBlur}
              error={
                touched.validatePassword && Boolean(errors.validatePassword)
              }
              helperText={touched.validatePassword && errors.validatePassword}
              fullWidth
            />
          </Grid>
          <Grid size={12} marginBottom={1}>
            <Button variant="contained" fullWidth onClick={() => onSubmit()}>
              Registrarse
            </Button>
          </Grid>
          <Grid size={12}>
            <Button variant="text" fullWidth onClick={secondaryButton}>
              Iniciar sesión
            </Button>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};
