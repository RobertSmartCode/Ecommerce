import React, { useState } from 'react';
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { Box, Typography } from "@mui/material";

interface SearchBarProps {
  toggleSearch: () => void;
  isSearchOpen: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isSearchOpen, toggleSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    // Aquí puedes manejar la lógica de búsqueda con el valor de inputValue
    // Por ejemplo, puedes realizar una búsqueda al presionar el botón de búsqueda.
    // Luego, puedes cerrar el cuadro de búsqueda usando toggleSearch.
  };

  const handleCloseClick = () => {
    setInputValue(""); // Limpiar el valor del campo de búsqueda al cerrar
    toggleSearch();
  };

  // Colores personalizados
  const customColors = {
    primary: {
      main: '#000',
      contrastText: '#000',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#FFFFFF',
    },
  };

  // Constantes para los estilos
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: "0 auto",
    backgroundColor: customColors.secondary.main,
    
  };



  const topBarStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row", 
    padding: "12px 8px",
    width: "100%",
    margin: "0 auto", 
    backgroundColor: customColors.primary.main,
    color: customColors.secondary.main,
  };
  
  const closeButtonStyles = {
    color: customColors.secondary.main,
    marginRight: '2px',
    marginLeft: '0',
    fontSize: '24px',
  };
  
  

  const searchTextStyles = {
    fontSize: "20px",
  };

  const inputStyles = {
    border: `1px solid ${customColors.secondary.main}`, // Usando el color personalizado
    background: customColors.secondary.main, // Usando el color personalizado
    borderRadius: "8px",
    padding: "8px",
  };

  const buttonStyles = {
    backgroundColor: customColors.primary.main, // Usando el color personalizado
    borderRadius: "0 4px 4px 0",
  };

  const iconStyles = {
    color: customColors.secondary.main, // Usando el color personalizado
  };

  return (
    <Box sx={containerStyles}>
      <Drawer
        anchor="right"
        open={isSearchOpen}
        onClose={handleCloseClick}
        sx={{
          display: { xs: "block" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            zIndex: 1300,
          },
        }}
      >
        <Box sx={topBarStyles}>
          <Typography sx={searchTextStyles}>Buscar</Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseClick}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "16px",
            width: "80%", 
            margin: "0 auto",
          }}
        >
          <InputBase
            placeholder="¿Qué estás buscando?"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={inputStyles}
          />
          <IconButton
            color="secondary"
            aria-label="search"
            onClick={handleSearchClick}
            sx={buttonStyles}
          >
            <SearchIcon sx={iconStyles} />
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SearchBar;
