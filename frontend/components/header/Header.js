/**
 * File Name: components/header/Header.js
 * Author: Dhruv Parthasarathy
 * File Created:
 * Last Modified: Dec, 8th, Thu
 *
 * About:
 * This file contains code for the Header component that appears on top of all pages in teh application
 *
 * This also holds the navigation component and the logout component once the user logs into the application
 */

import * as React from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { openLeftDrawer } from "../../store/slice/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import TemporaryDrawer from "../drawer/Drawer";

// Defining constatns
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBarComponent() {
  // STATE VARIABLES
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const Router = useRouter();
  const dispatch = useDispatch();
  const currentView = useSelector((state) => {
    return state.app.currentView;
  });

  /**
   * This function is used to show and hide the menu, the user profile icon and the
   * create new ticket button
   * We hide these when the current view is either on the Login, Sign Up or Forgot Password page
   * @returns void
   */
  const shouldShow = () => {
    return (
      currentView !== "Login" &&
      currentView !== "Sign Up" &&
      currentView !== "Forgotpassword"
    );
  };

  /**
   * This function dispatches the event to
   * toggle the left nav bar open state
   * @param {Event} event
   */
  const handleOpenNavMenu = (event) => {
    dispatch(openLeftDrawer());
  };

  /**
   * This function is used to open and close the user information popup from the top right corner of the app
   * @param {Event} event
   */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  /**
   * This function is used to collapse the user information card on the top right
   */
  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  /**
   * This function is used to trigger the logout functionality
   */
  const handleLogout = () => {
    setAnchorElUser(false);
    Router.push("/login");
  };

  /**
   * This function is called when the user clicks on the New Ticket button
   */
  const handleOpenNewTicketForm = () => {
    Router.push("/ticket-management/new");
  };

  /**
   * Getting the the user's details from the app state
   */
  const userDetails = useSelector((state) => {
    return state.app.userDetails;
  });

  // const slicedData = (firstname) => {
  //   return firstname.substring(0, 1)
  // }

  /**
   * Route to login page when user tries to navigate to any other page without being logged in
   */
  useEffect(() => {
    if ((Object.keys(userDetails)?.length === 0) &&
      !window.location.href.includes("/signup") &&
      !window.location.href.includes("/forgotPassword") &&
      !window.location.href.includes("/login")) {
      Router.push('/login');
    }
  }, [userDetails]);

  return (
    <>
      {/* WRAPPER */}
      <AppBar
        position="static"
        sx={{
          bgcolor: "#FFFFFF",
          color: "#12344d",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {shouldShow() ? (
              // Navigation menu button
              <Box sx={{ display: "flex" }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : null}

            {/* Logo for small size screen */}
            <Link scroll={false} href="/">
              <AdbIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "#12344d",
                }}
              />
            </Link>

            {/* CURRENT VIEW NAME */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#12344d",
                textDecoration: "none",
              }}
            >
              {currentView}
            </Typography>

            {/* Logo for big size screen */}
            {/* <Link to={"/"} > */}
            <Link scroll={false} href="/">
              <AdbIcon
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                  color: "#12344d",
                }}
              />
            </Link>
            {/* CURRENT VIEW */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#12344d",
                textDecoration: "none",
              }}
            >
              {currentView}
            </Typography>

            {shouldShow() ? (
              <>
                <Button
                  variant="contained"
                  sx={{
                    // bgcolor: '#12344D',
                    // color: '#FFFFFF',
                    mr: 5,
                    // ':hover': {
                    //   bgcolor: '#ECEFF3', // theme.palette.primary.main
                    //   color: '#12344D',
                    // }
                  }}
                  onClick={handleOpenNewTicketForm}
                >
                  New Ticket
                </Button>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={userDetails.firstname}
                        src="/static/images/avatar/2.jpg"
                        sx={{ bgcolor: deepOrange[500] }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      key={userDetails.firstname}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">
                        {userDetails.firstname} {userDetails.lastname}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      key={userDetails.lastname}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">
                        Phone: {userDetails.phoneNumber}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      key={userDetails.email}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">
                        Email: {userDetails.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem key="Logout" onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
      <TemporaryDrawer />
    </>
  );
}

export default ResponsiveAppBarComponent;
