import React, { useEffect, useState } from "react"
import type { Author } from "../../../domain";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

interface Props {
  loading: boolean,
  data: Author[],
  handleOpen: () => void,
  handleSelect: (user: Author | null) => void,
  error?: boolean,
  helperText?: string
}
export const AutoCompleteAuthor = ({ loading, data, handleOpen, handleSelect, error, helperText }: Props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Author[]>([]);

  useEffect(() => {
    setOptions(data)
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  }

  const handleOpenAutoComplete = () => {
    setOpen(true);

    handleOpen();
  }

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpenAutoComplete}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onChange={(_, newValue) => {
        handleSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          fullWidth
          label="Buscar autor"
          error={error}
          helperText={helperText}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  )
}
