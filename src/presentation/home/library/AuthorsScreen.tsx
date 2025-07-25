import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { DataGrid, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CreateAuthor } from "./CreateAuthor";
import type { Author } from "../../../domain";
import { useDispatch, useSelector } from "react-redux";
import { LibraryThunk, type StoreModel } from "../../store";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID"},
  { field: "name", headerName: "Nombre", width: 200},
  { field: "birthdate", headerName: "Fecha de nacimiento", width: 200 },
];

const paginationModel: Partial<GridPaginationModel> = { page: 0, pageSize: 5 };

export const AuthorsScreen = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [rows, setRows] = useState<Author[]>([]);
  const dispatch = useDispatch<any>();
  const { authors } = useSelector((state: StoreModel) => state.library);

  useEffect(() => {
    dispatch(LibraryThunk.startGetAuthors());
  }, []);

  useEffect(() => {
    if(authors.data.length > 0) {
      setRows(authors.data.map((item) => ({id: item.id, name: item.name, birthdate: item.birthdate})))
    }
  }, [authors]);

  const createAuthor = (value: Author) => {
    dispatch(LibraryThunk.startCreate(value));
    setOpenDialog(false);
  }

  return (
    <>
      <Grid container>
        <Grid size={12} display={"flex"} flexDirection={"row-reverse"}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenDialog(true)}
          >
            <Add></Add>
            Agregar
          </Button>
        </Grid>
        <Grid size={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Grid>
      </Grid>
      {openDialog && (
        <CreateAuthor
          open={openDialog}
          closeAction={() => setOpenDialog(false)}
          primaryButton={createAuthor}
        />
      )}
    </>
  );
};
