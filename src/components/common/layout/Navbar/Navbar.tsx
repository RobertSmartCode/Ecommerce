import { AppBar, Box, CssBaseline, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";


import SearchBar from '../SearchBar/SearchBar'

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DrawerContent from "../Drawer/Drawer"


import { useRef, useEffect, useState, useContext } from "react";



import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../../context/AuthContext";


const drawerWidth = 411;

function Navbar(props: any) {
  const { logoutContext, isLogged, user } = useContext(AuthContext)!;
  const { window } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;


  const handleDrawerToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/login");
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


  const container =
    window !== undefined ? () => window().document.body : undefined;

const drawer = (
  <SwipeableDrawer
    anchor="left"
    open={isMenuOpen}
    onClose={handleDrawerToggle}
    onOpen={() => {}}
    container={container}
    sx={{
      display: { xs: "block" },
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        width: drawerWidth,
        top: `${appBarRef.current?.clientHeight || 0}px`,
        backgroundColor: "#1976d2",
        height: "100%",
        zIndex: 1300,
      },
    }}
  >
    {/* Utiliza el componente DrawerContent aquí */}
    <DrawerContent
      handleDrawerToggle={handleDrawerToggle}
      isLogged={isLogged}
      user={user}
      rolAdmin={rolAdmin}
      handleLogout={handleLogout}
    />
  </SwipeableDrawer>
);



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
  onOpen={() => {}} 
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
    <SearchBar handleSearch={props.handleSearch} />
  </Toolbar>
)}




        <Outlet />
      </Box>
    </Box>
  );
}

export default Navbar;
