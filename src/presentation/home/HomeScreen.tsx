import { AccountCircleRounded, LogoutRounded, Storefront } from "@mui/icons-material";
import { AppBar, Box, Button, Popover, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AuthScreen } from "../auth";
import { useDispatch, useSelector } from "react-redux";
import { UserThunk, type StoreModel } from "../store";
import { SellerScreen } from "./seller/SellerScreen";
import { AdminScreen } from "./admin/AdminScreen";
import { ClientScreen } from "./client/ClientScreen";

export const HomeScreen = () => {
  const dispatch = useDispatch<any>();
  const { logged } = useSelector((state: StoreModel) => state.users);

  useEffect(() => {
    dispatch(UserThunk.startGetInfo());
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const logout = () => {
    dispatch(UserThunk.startLogout());
  }

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Storefront></Storefront>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginLeft: 2 }}
            >
              Marketplacet
            </Typography>
            {!logged.data ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Acceder
              </Button>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                <div>
                  <Button
                    variant="outlined"
                    aria-describedby="popover-user"
                    onClick={handleClick}
                    startIcon={<AccountCircleRounded />}
                  >
                    {logged.data?.name}
                  </Button>
                  <Popover
                    id="popover-user"
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Button onClick={logout} startIcon={<LogoutRounded/>} color="warning">Salir</Button>
                  </Popover>
                </div>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        {logged.data?.role === "seller" && <SellerScreen />}
        {logged.data?.role === "admin" && <AdminScreen />}
        {(!logged.data || logged.data?.role === "client") && <ClientScreen />}
      </Box>
      {openModal && (
        <AuthScreen open={openModal} handleClose={() => setOpenModal(false)} />
      )}
    </>
  );
};
