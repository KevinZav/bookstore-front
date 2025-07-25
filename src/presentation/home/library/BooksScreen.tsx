import { Add, Download } from "@mui/icons-material";
import { Box, Button, Grid, Snackbar, styled } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import type { StatusType } from "../../../domain";
import { useDispatch, useSelector } from "react-redux";
import { LibraryThunk, type StoreModel } from "../../store";
import { CreateBook } from "./CreateBook";
import type { Book } from "../../../domain/entities/book";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "coverUrl", headerName: "Imagen", renderCell: (params) => (
    <Box sx={{ display: 'flex', height: '50px', width: '50px', alignItems: 'center', justifyContent: 'center' }}>
      <img src={params.value} style={{ objectFit: 'contain', height: '100%' }}></img>
    </Box>
  ) },
  { field: "title", headerName: "Titulo", width: 200 },
  { field: "isbn", headerName: "ISBN", width: 150 },
  { field: "pages", headerName: "# Páginas", width: 100 },
  { field: "authorName", headerName: "Autor", width: 150},
];

const paginationModel: Partial<GridPaginationModel> = { page: 0, pageSize: 5 };

export const BooksScreen = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const { authors, books } = useSelector((state: StoreModel) => state.library);

  const rows = useMemo(() => {
    if (books.data && authors.data) {
      return books.data.map((item) => {
        const author = authors.data.find((element) => element.id === item.authorId)

        return {
          ...item,
          authorName: author?.name
        }
      });
    }
    return books.data;
  }, [books, authors]);

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
    dispatch(LibraryThunk.startGetAuthors());
    dispatch(LibraryThunk.startGetBooks());
  }, []);

  const createBook = (value: Book) => {
    dispatch(
      LibraryThunk.startCreateBook(value, (status: StatusType) => {
        const message =
          status === "error"
            ? "Error al intentar crear libro"
            : "Libro creado con exito";
        setSnackbarMessage({
          ...snackbarMessage,
          open: true,
          message,
        });

        if (status === "success") {
          setOpenDialog(false);
        }
      })
    );
  };

  const uploadFile = (files: FileList | null) => {
    if (files?.length === 0 || !files) {
      return;
    }
    const file = files[0];
    dispatch(LibraryThunk.startUploadCSVFile(file, (action: StatusType) => {
      console.log(action)
    }));
  }

  return (
    <>
      <Grid container>
        <Grid size={12} display={"flex"} flexDirection={"row-reverse"}>
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            style={{ marginLeft: 5 }}
            size="small"
            variant="outlined"
            startIcon={<Download></Download>}
          >
            Importar CSV
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => uploadFile(event.target.files)}
              multiple
            />
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setOpenDialog(true)}
            startIcon={<Add/>}
          >
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
        <CreateBook
          open={openDialog}
          closeAction={() => setOpenDialog(false)}
          primaryButton={createBook}
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
