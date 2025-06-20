import React, { useEffect, useState } from "react"
import type { User } from "../../../domain";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

interface Props {
  loading: boolean,
  data: User[],
  handleOpen: () => void,
  handleSelect: (user: User | null) => void
}
export const AutoCompleteUser = ({ loading, data, handleOpen, handleSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<User[]>([]);

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
      isOptionEqualToValue={(option, value) => option.email === value.email}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onChange={(_, newValue) => {
        handleSelect(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filtrar por vendedor"
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
