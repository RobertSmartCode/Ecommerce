import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuItems } from "../../../../router/navigation";
import { logout } from "../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../../context/AuthContext";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SvgIcon from "@mui/material/SvgIcon";
import ShopIcon from '@mui/icons-material/Shop';
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 200;

function Navbar(props: any) {
  const { logoutContext, isLogged, user } = useContext(AuthContext)!;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        {menuItems.map(({ id, path, title, Icon }) => {
          return (
            <Link key={id} to={path}>
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
        }}
      >
        <Toolbar
          sx={{ gap: "20px", display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/" style={{ color: "whitesmoke" }}>
            Bazar-deco
          </Link>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor={"right"}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#1976d2",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          width: "100%",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;