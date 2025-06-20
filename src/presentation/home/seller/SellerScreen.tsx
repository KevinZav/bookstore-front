import { AddBusinessRounded } from "@mui/icons-material";
import { Fab, Grid, Snackbar, Typography } from "@mui/material";
import { EmptyState, ProductList } from "../../shared";
import { useEffect, useState } from "react";
import { CreateProduct } from "./CreateProduct";
import type { Product } from "../../../domain";
import { useDispatch, useSelector } from "react-redux";
import type { StoreModel } from "../../store";
import { ProductThunk } from "../../store/product/product-thunk";

export const SellerScreen = () => {
  const dispatch = useDispatch<any>();
  const { all, one } = useSelector((state: StoreModel) => state.products);

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const create = (values: Omit<Product, "id">) => {
    dispatch(ProductThunk.startCreate({ ...values, id: 0 }));
  };

  const [snackbarMessage, setSnackbarMessage] = useState({
    duration: 2400,
    open: false,
    message: "",
  });

  const snackbarClose = () => {
    setSnackbarMessage({
      ...snackbarMessage,
      open: false,
    });
  };

  useEffect(() => {
    dispatch(ProductThunk.startGetOwn());
  }, []);

  useEffect(() => {
    const message = one.status === 'success'
      ? 'Producto creado con éxito'
      : 'No se pudo crear el producto';
    if (one.status !== "initial") {
      setSnackbarMessage({
        ...snackbarMessage,
        open: true,
        message
      });

      if (one.status === 'success') {
        closeModal();
      }
    }
  }, [one.status]);

  return (
    <>
      <Grid container margin={5}>
        <Grid size={12}>
          <Typography variant="h5" marginBottom={3}>
            Tus productos
          </Typography>
          {
            all.data.length > 0
              ? <ProductList products={all.data}></ProductList>
              : <EmptyState title="Sin Productos" subtitle="Crea productos para que puedas visualizarlos" buttonText="Crear" onButtonClick={() => setOpenModal(true)}></EmptyState>
          }
          
        </Grid>
      </Grid>
      <Fab
        size="small"
        color="primary"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: "3em",
          right: "3em",
        }}
        onClick={() => setOpenModal(true)}
        aria-label="add"
      >
        <AddBusinessRounded sx={{ marginLeft: 1, marginRight: 1 }} />
        <Typography variant="button" marginRight={1}>
          Crear
        </Typography>
      </Fab>
      {openModal && (
        <CreateProduct
          open={openModal}
          closeAction={closeModal}
          primaryButton={create}
        />
      )}
      <Snackbar
        open={snackbarMessage.open}
        onClose={snackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message={snackbarMessage.message}
        key={"auth-error-snackbar"}
        autoHideDuration={1200}
      />
    </>
  );
};
