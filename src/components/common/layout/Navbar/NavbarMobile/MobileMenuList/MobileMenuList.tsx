import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SwipeableDrawer,
  useTheme,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShopIcon from "@mui/icons-material/Shop";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";
import { menuItems } from "../../../../../../router/navigation";

interface MobileMenuListProps {
  handleMenuToggle: () => void;
  isLogged: boolean;
  user: {
    rol: string;
  };
  rolAdmin: string;
  handleLogout: () => void;
  isMenuOpen: boolean;
  container?: any;
  MenuButtonWidth: number;
  Top: string;
}

const MobileMenuList: React.FC<MobileMenuListProps> = ({
  handleMenuToggle,
  isLogged,
  user,
  rolAdmin,
  isMenuOpen,
  container,
  MenuButtonWidth,
  Top,
  handleLogout,
}) => {
  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;
  const textColor = theme.palette.text.primary;

  return (
    <SwipeableDrawer
      anchor="left"
      open={isMenuOpen}
      onClose={handleMenuToggle}
      onOpen={() => {}}
      container={container}
      sx={{
        display: { xs: "block" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: MenuButtonWidth,
          top: Top,
          backgroundColor: primaryColor,
          height: "100%",
          zIndex: 1300,
        },
      }}
    >
      <div>
        <List>
          {menuItems.map(({ id, path, title, Icon }) => {
            return (
              <Link key={id} to={path} onClick={handleMenuToggle}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: textColor }}>
                      <SvgIcon>
                        <Icon />
                      </SvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={title} sx={{ color: textColor }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}

          {!isLogged ? (
            <Link to="/login">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon sx={{ color: textColor }} />
                  </ListItemIcon>
                  <ListItemText primary={"Iniciar sesión"} sx={{ color: textColor }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : null}

          {isLogged && user.rol === rolAdmin && (
            <Link to="/dashboard">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon sx={{ color: textColor }} />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} sx={{ color: textColor }} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {isLogged && (
            <Link to="/user-orders">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShopIcon sx={{ color: textColor }} />
                  </ListItemIcon>
                  <ListItemText primary={"Mis compras"} sx={{ color: textColor }} />
                </ListItemButton>
              </ListItem>
            </Link>
          )}

          {isLogged && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: textColor }} />
                </ListItemIcon>
                <ListItemText primary={"Cerrar sesión"} sx={{ color: textColor }} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default MobileMenuList;



