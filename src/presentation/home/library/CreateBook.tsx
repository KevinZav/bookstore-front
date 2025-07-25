import { Button, Dialog, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { bookSchema, type Author } from "../../../domain";
import { Form, Formik, useFormik } from "formik";
import type { Book } from "../../../domain/entities/book";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LibraryThunk, type StoreModel } from "../../store";
import { AutoCompleteAuthor } from "../../shared";

interface Props {
  open: boolean;
  closeAction: () => void;
  primaryButton: (values: Book) => void;
}

export const CreateBook = ({ open, closeAction, primaryButton }: Props) => {
  const dispatch = useDispatch<any>();
  const { authors } = useSelector((state: StoreModel) => state.library);
  const initialValues: Book = {
    title: "",
    isbn: "",
    authorId: "",
    pages: 0,    
  };

  useEffect(() => {
    dispatch(LibraryThunk.startGetAuthors());
  }, []);

  const onSubmit = async () => {
    setTouched({ title: true, isbn: true, pages: true, authorId: true }, true);
    validateForm(values).then((errors) => {
      if (hasErrors(errors)) return;
      console.log(values)
      primaryButton(values);
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: bookSchema,
  });
  const { values, handleBlur, errors, touched, setTouched, validateForm, setValues } =
    formik;

  const hasErrors = (errors: any) => {
    return Object.keys(errors).length > 0;
  };

  const handleOpen = () => {
    dispatch(LibraryThunk.startGetAuthors());
  };

  const handleSelect = (author: Author | null) => {
      if (author) {
        setValues({
          ...values,
          authorId: `${author.id}`
        })
      } else {
        setValues({
          ...values,
          authorId: ''
        })
      }
    };

  return (
    <Dialog
      maxWidth="xs"
      onClose={closeAction}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Grid sx={{ width: "400px" }}>
          <Typography variant="h6" textAlign="center" marginBottom={3}>Nuevo libro</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={bookSchema}
            onSubmit={onSubmit}
          >
            <Form>
            <Grid size={12} marginBottom={3}>
                <TextField
                  size="small"
                  label="ISBN"
                  name="isbn"
                  value={values.isbn}
                  onChange={formik.handleChange}
                  onBlur={handleBlur}
                  error={touched.isbn && Boolean(errors.isbn)}
                  helperText={touched.isbn && errors.isbn}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid size={12} marginBottom={2}>
                <TextField
                  size="small"
                  label="Titulo"
                  name="title"
                  value={values.title}
                  onChange={formik.handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid size={12} marginBottom={2}>
                <TextField
                  type="number"
                  size="small"
                  label="Número de paginas"
                  name="pages"
                  value={values.pages}
                  onChange={formik.handleChange}
                  onBlur={handleBlur}
                  error={touched.pages && Boolean(errors.pages)}
                  helperText={touched.pages && errors.pages}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid size={12} marginBottom={2}>
                <AutoCompleteAuthor
                  data={authors.data}
                  loading={authors.status === 'loading'}
                  handleOpen={handleOpen}
                  handleSelect={handleSelect}
                  error={touched.pages && Boolean(errors.pages)}
                  />
              </Grid>
              <Grid size={12} marginBottom={1}>
                <Button variant="contained" fullWidth onClick={onSubmit}>
                  Crear
                </Button>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
