import { Grid, Typography } from "@mui/material";
import { AutoCompleteUser, EmptyState, ProductList } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import { UserThunk, type StoreModel } from "../../store";
import { useEffect } from "react";
import { ProductThunk } from "../../store/product/product-thunk";
import type { User } from "../../../domain";

export const AdminScreen = () => {
  const dispatch = useDispatch<any>();
  const { all } = useSelector((state: StoreModel) => state.products);
  const { all: allUsers } = useSelector((state: StoreModel) => state.users);

  useEffect(() => {
    dispatch(ProductThunk.startGetAll());
  }, []);

  const handleOpen = () => {
    dispatch(UserThunk.startGetAll(""));
  };

  const handleSelect = (user: User | null) => {
    if (!user) {
      dispatch(ProductThunk.startGetAll());
    } else {
      dispatch(ProductThunk.startGetByEmail(user.email));
    }
  };

  return (
    <Grid container margin={5}>
      <Grid size={12}>
        <Typography variant="h5" marginBottom={3}>
          Productos registrados
        </Typography>
        <Grid size={12} marginBottom={3}>
          <AutoCompleteUser
            data={allUsers.data}
            loading={allUsers.status === "loading"}
            handleOpen={handleOpen}
            handleSelect={handleSelect}
          />
        </Grid>
        {all.data.length > 0 ? (
          <ProductList products={all.data}></ProductList>
        ) : (
          <EmptyState
            title="Sin Productos"
            subtitle="No hay productos que mostrar"
            buttonText="Crear"
          ></EmptyState>
        )}
      </Grid>
    </Grid>
  );
};
