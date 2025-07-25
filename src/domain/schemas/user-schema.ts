import * as Yup from 'yup';

export const userSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Correo obligatorio'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('Contraseña obligatoria'),
  validatePassword: Yup.string().oneOf([Yup.ref('password')], 'La contraseña no coincide'),
});

export const authSchema = Yup.object().shape({
  username: Yup.string().email('Correo inválido').required('Correo obligatorio'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('Contraseña obligatoria')
});