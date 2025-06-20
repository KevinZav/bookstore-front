import { Dialog, DialogContent, Grid, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoginScreen } from "./login/LoginScreen";
import { SignScreen } from "./sign/SignScreen";
import type { AuthUser, User } from "../../domain";
import { useDispatch, useSelector } from "react-redux";
import { UserThunk, type StoreModel } from "../store";

interface Props {
  open: boolean,
  handleClose: () => void
}

export const AuthScreen = ({ open, handleClose }: Props) => {
  const dispatch = useDispatch<any>();
  const { logged } = useSelector((state: StoreModel) => state.users);

  const [authAction, setAuthAction] = useState<'login' | 'register'>('login');

  const changeAction = () => {
    const newAtuthAction = authAction === 'login' ? 'register' : 'login';
    setAuthAction(newAtuthAction);
  }

  const closeAction = () => {
    setAuthAction('login');
    handleClose();
  }

  const login = (values: AuthUser) => {
    dispatch(UserThunk.startLogin(values));
  }

  const sign = (values: User) => {
    dispatch(UserThunk.startSign(values));
  }

  const [snackbarMessage, setSnackbarMessage] = useState({
    duration: 2400,
    open: false,
    message: ''
  });

  const snackbarClose = () => {
    setSnackbarMessage({
      ...snackbarMessage,
      open: false
    });
  }

  useEffect(() => {
    if (logged.status !== 'initial') {
      const message = logged.status === 'error'
        ? 'Error al intentar acceder'
        : `Bienvenido, ${logged.data?.name}`;
      setSnackbarMessage({
        ...snackbarMessage,
        open: true,
        message
      });
      if (logged.status === 'error') {
        setTimeout(() => {
          dispatch(UserThunk.startLogout());
        }, snackbarMessage.duration);
      }
      if (logged.status === 'success') {
        handleClose();
      }
    }
  }, [logged.status]);

  return (
    <>
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
              { authAction === 'login' ? 'Iniciar Sesión' : 'Registro' }
            </Typography>
          </Grid>
          <Grid container>
            {
              authAction === 'login'
                ? <LoginScreen primaryButton={login} secondaryButton={changeAction}></LoginScreen>
                : <SignScreen primaryButton={sign} secondaryButton={changeAction}></SignScreen>
            }
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarMessage.open}
        onClose={snackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={snackbarMessage.message}
        key={'auth-error-snackbar'}
        autoHideDuration={1200}
      />
    </>
  );
};
