import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@mui/material";

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShopIcon from '@mui/icons-material/Shop';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";


import { Link } from "react-router-dom";
import { menuItems } from "../../../../router/navigation";

// Define los tipos para las propiedades del componente
interface DrawerContentProps {
  handleDrawerToggle: () => void;
  isLogged: boolean;
  user: {
    rol: string; // Reemplaza con el tipo correcto para la propiedad 'rol'
  };
  rolAdmin: string; // Reemplaza con el tipo correcto para la propiedad 'rolAdmin'
  handleLogout: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  handleDrawerToggle,
  isLogged,
  user,
  rolAdmin,
  handleLogout,
}) => {
  return (
    <div>
      <List>
        {menuItems.map(({ id, path, title, Icon }) => {
          return (
            <Link key={id} to={path} onClick={handleDrawerToggle}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "whitesmoke" }}>
                    <SvgIcon>
                      <Icon />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText primary={title} sx={{ color: "whitesmoke" }} />
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
                  <LoginIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary={"Iniciar sesión"} sx={{ color: "whitesmoke" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : null}

        {isLogged && user.rol === rolAdmin && (
          <Link to="/dashboard">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} sx={{ color: "whitesmoke" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        {isLogged && (
          <Link to="/user-orders">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShopIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary={"Mis compras"} sx={{ color: "whitesmoke" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        {isLogged && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "whitesmoke" }} />
              </ListItemIcon>
              <ListItemText primary={"Cerrar sesión"} sx={{ color: "whitesmoke" }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default DrawerContent;
