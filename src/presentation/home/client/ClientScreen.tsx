import { Button, Grid, TextField, Typography } from "@mui/material";
import { EmptyState, ProductList } from "../../shared";
import { useDispatch, useSelector } from "react-redux";
import type { StoreModel } from "../../store";
import { useEffect, useMemo } from "react";
import { ProductThunk } from "../../store/product/product-thunk";
import type { ProductFilters } from "../../../domain";
import { useFormik } from "formik";

export const ClientScreen = () => {
  const initialValues: ProductFilters = {
    search: "",
    min: 0,
    max: 0,
  };
  const dispatch = useDispatch<any>();
  const { all } = useSelector((state: StoreModel) => state.products);

  const onSubmit = () => {
    dispatch(ProductThunk.startGetFiltered(formatFilters));
  };

  const formik = useFormik({ initialValues, onSubmit });
  const { values } = formik;

  const formatFilters = useMemo<ProductFilters>(() => {
    const min = values.min || 0;
    const max = values.max || 0
    if (max <= min) {
      return {
        search: values.search
      }
    }
    return values;
  }, [values]);

  useEffect(() => {
    dispatch(ProductThunk.startGetFiltered(formatFilters));
  }, []);

  return (
    <Grid container margin={5}>
      <Grid size={12}>
        <Typography variant="h5" marginBottom={3}>
          Todos los productos
        </Typography>
        <Grid container marginBottom={3} spacing={2}>
          <Grid size={{ lg: 6, md: 6, xs: 12 }}>
            <TextField
              label="Buscar producto (SKU, nombre)"
              size="small"
              name="search"
              value={values.search}
              onChange={formik.handleChange}
              fullWidth
            ></TextField>
          </Grid>
          <Grid size={{ lg: 3, md: 3, xs: 6 }} spacing={2}>
            <TextField
              type="number"
              label="Precio mínimo"
              size="small"
              name="min"
              value={values.min}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ lg: 3, md: 3, xs: 6 }} spacing={2}>
            <TextField
              type="number"
              label="Precio maximo"
              size="small"
              name="max"
              value={values.max}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button variant="contained" onClick={onSubmit}>Buscar</Button>
          </Grid>
        </Grid>
        {all.data.length > 0 ? (
          <ProductList products={all.data}></ProductList>
        ) : (
          <EmptyState
            title="Sin Productos"
            subtitle="No hay productos que mostrar"
          ></EmptyState>
        )}
      </Grid>
    </Grid>
  );
};
