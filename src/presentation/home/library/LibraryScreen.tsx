import { Button, ButtonGroup, Grid } from "@mui/material";
import { useState } from "react";
import { AuthorsScreen } from "./AuthorsScreen";
import { BooksScreen } from "./BooksScreen";

type screenActive = 'authors' | 'books';

export const LibraryScreen = () => {
  const [screen, setScreen] = useState<screenActive>('authors');
  return (
    <>
      <Grid padding={5} height={'100%'}>
        <Grid size={12} marginBottom={5} display={'flex'} justifyContent={'center'}>
          <ButtonGroup size="small">
            <Button
              variant={screen == 'books' ? 'contained' : 'outlined'}
              onClick={() => setScreen('books')}>Libros</Button>
            <Button
              variant={screen == 'authors' ? 'contained' : 'outlined'}
              onClick={() => setScreen('authors')}>Autores</Button>
          </ButtonGroup>
        </Grid>
        <Grid size={12}>
          {
            screen === 'authors'
              ? <AuthorsScreen/>
              : <BooksScreen/>
          }
        </Grid>
      </Grid>
    </>
  );
};
