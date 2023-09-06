import { AppBar, Box, CssBaseline, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SvgIcon from "@mui/material/SvgIcon";
import ShopIcon from '@mui/icons-material/Shop';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import InputBase from "@mui/material/InputBase";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";


import { useRef, useEffect, useState, useContext } from "react";




import { Link, Outlet, useNavigate } from "react-router-dom";
import { menuItems } from "../../../../router/navigation";
import { logout } from "../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../../context/AuthContext";


const drawerWidth = 411;

function Navbar(props: any) {
  const { logoutContext, isLogged, user } = useContext(AuthContext)!;
  const { window } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;


  const handleDrawerToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/login");
  };
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  
  const handleSearch = () => {
    // Lógica de búsqueda aquí, puedes realizar una acción como redireccionar a una página de resultados o hacer una solicitud de búsqueda al servidor
    // Ejemplo: redirigir a la página de resultados con el término de búsqueda como parámetro
    if (searchTerm.trim() !== "") {
      navigate(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const [appBarHeight, setAppBarHeight] = useState<number | null>(null);
  const appBarRef = useRef<HTMLDivElement | null>(null); 
  const [cartOpen, setCartOpen] = useState(false);

 


 
  
useEffect(() => {
  // Obtener la altura de la AppBar una vez que esté renderizada
  if (appBarRef.current) {
    
    setAppBarHeight(appBarRef.current.clientHeight);
  }
}, []);


  const drawer = (
    <div>
      <Toolbar />

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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        ref={appBarRef} 
        sx={{
          width: "100%",
          zIndex: 1 
        }}
      >
       <Toolbar
  sx={{
    gap: "20px",
    display: "flex",
    justifyContent: "space-between",
  }}
>
  <div style={{ display: "flex", alignItems: "center" }}>
    {/* Elementos a la izquierda (menú de hamburguesa y nombre de la empresa) */}
    
    <IconButton
      color="secondary"
      aria-label="toggle menu"
      edge="start"
      onClick={handleDrawerToggle}
    >
  {isMenuOpen ? <CloseIcon color="secondary" /> : <MenuIcon color="secondary" />}
</IconButton>

    <Link to="/" style={{ color: "whitesmoke", textDecoration: "none" }}>
      Pinguinos Kids
    </Link>
  </div>
  <div style={{ display: "flex", alignItems: "center" }}>
    {/* Campo de búsqueda */}
   <IconButton
     color="secondary"
     aria-label="search"
     onClick={toggleSearch}
    >
    <SearchIcon />
    </IconButton>

    {/* Icono del carrito */}
    <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
    <IconButton
      color="secondary"
      aria-label="shopping cart"
      onClick={() => setCartOpen(!cartOpen)}
    >
    <ShoppingCartIcon />
    </IconButton>
    </Link>

  </div>
</Toolbar>

      </AppBar>
      <Box component="nav" aria-label="mailbox folders">

      <SwipeableDrawer
  anchor="left"
  open={isMenuOpen}
  onClose={handleDrawerToggle}
  onOpen={() => {}} // Función vacía
  container={container}
  sx={{
    display: { xs: "block" },
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      top: `${appBarRef.current?.clientHeight || 0}px`, // Obtiene la altura de la AppBar
      backgroundColor: "#1976d2",
      height: "100%",
      zIndex: 1300,
    },
  }}
>
  {drawer}
</SwipeableDrawer>

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

  {searchOpen && (
  <Toolbar>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "#1976d2", // Fondo azul (color primario)
        borderRadius: "4px", // Borde redondeado
        border: "2px solid #1976d2", // Borde delineado en color primario
      }}
    >
      <InputBase
        placeholder="Buscar..."
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          color: "#000000", // Color del texto dentro del campo
          background: "white",
          border: "1px #1976d2",
          padding: "8px", // Espacio dentro del campo
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <IconButton
        color="secondary"
        aria-label="search"
        onClick={handleSearch}
        style={{
          background: "#1976d2", // Fondo azul (color primario)
          borderRadius: "0 4px 4px 0", // Borde redondeado en el lado derecho
        }}
      >
        <SearchIcon style={{ color: "white" }} />
      </IconButton>
    </div>
  </Toolbar>
)}




        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;
