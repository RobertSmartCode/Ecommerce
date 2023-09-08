import { useRef, useEffect, useState, useContext } from "react";
import {
  IconButton,
  Toolbar,
  CssBaseline,
  AppBar,
  Box,
} from "@mui/material";


import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { Link, Outlet, useNavigate } from "react-router-dom";

import MobileMenuList from "./MobileMenuList/MobileMenuList";
import MobileLogo from "./MobileLogo/MobileLogo";
import SearchBar from "./SearchBar/SearchBar";
import MobileCart from "./ MobileCart/MobileCart"


import { logout } from "../../../../../firebase/firebaseConfig";
import { AuthContext } from "../../../../../context/AuthContext";




// Supongamos que tienes estas propiedades definidas en tu componente principal
const NavbarMobile = (props:any) => {

  const { logoutContext, isLogged, user } = useContext(AuthContext)!;
  const { window } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

  const handleMenuToggle = () => {
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

  const cartItemCount = 0; // O ajusta esto según tu lógica

  const handleCartClick = () => {
  setCartOpen(!cartOpen);
};


  const [appBarHeight, setAppBarHeight] = useState<number | null>(null);
  const appBarRef = useRef<HTMLDivElement | null>(null); 

useEffect(() => {
  // Obtener la altura de la AppBar una vez que esté renderizada
  if (appBarRef.current) {
    
    setAppBarHeight(appBarRef.current.clientHeight);
  }
}, []);

const MenuButtonWidth = 411;
const Top = `${appBarHeight || 0}px`

  const container = window !== undefined ? () => window().document.body : undefined;

  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/pinguinos-kids.appspot.com/o/LogoMobile%2FLogoMobile.png?alt=media&token=eca73682-14ea-4dbd-803d-31be6a85d6ad";



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

    {/* Elementos a la izquierda (menú de hamburguesa y Logo de la empresa) */}


                         {/* Menú de hamburguesa */}
    <IconButton
      color="secondary"
      aria-label="toggle menu"
      edge="start"
      onClick={handleMenuToggle}
    >
  {isMenuOpen ? <CloseIcon color="secondary" /> : <MenuIcon color="secondary" />}
</IconButton>

                            {/* Logo de la Empresa */}

    <Link to="/" style={{ color: "whitesmoke", textDecoration: "none" }}>
    <MobileLogo src={logoUrl} alt="Logo" />
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
            onClick={handleCartClick}
          >
            <MobileCart itemCount={cartItemCount} onClick={handleCartClick} />
          </IconButton>
          </Link>


  </div>
</Toolbar>

      </AppBar>

                   {/* Lista de menú */}

      <Box component="nav" aria-label="mailbox folders">
     <MobileMenuList
          handleMenuToggle={handleMenuToggle}
          isLogged={isLogged}
          user={user}
          rolAdmin={rolAdmin}
          handleLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          container={container}
          MenuButtonWidth={MenuButtonWidth}
          Top={Top}
        />
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
 
};

export default NavbarMobile;


