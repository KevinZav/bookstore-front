import { useEffect, useState } from "react";
import { AuthScreen } from "../auth";
import { useDispatch, useSelector } from "react-redux";
import { UserThunk, type StoreModel } from "../store";
import { LibraryScreen } from "./library/LibraryScreen";
import { EmptyState } from "../shared";
import { Box } from "@mui/material";

export const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const { logged } = useSelector((state: StoreModel) => state.users);

  useEffect(() => {
    dispatch(UserThunk.startGetInfo());
  }, []);

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box
        height={"100vh"}
        width={"100vw"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {logged.data ? (
          <LibraryScreen />
        ) : (
          <EmptyState
            title="Iniciar Sesión"
            subtitle="Inicia sesión para empezar a gestionar tus libros"
            buttonText="Iniciar"
            onButtonClick={() => setOpenModal(true)}
          ></EmptyState>
        )}
      </Box>
      {openModal && (
        <AuthScreen open={openModal} handleClose={() => setOpenModal(false)} />
      )}
    </>
  );
};
