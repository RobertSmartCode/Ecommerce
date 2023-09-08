import React from "react";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles"; // Importa useTheme desde Material-UI

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

function SearchBar({ handleSearch }: SearchBarProps) {
  const theme = useTheme(); // Obtiene el tema actual

  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Centra horizontalmente en pantallas de escritorio
        width: "100%",
        background: theme.palette.secondary.main, // Utiliza el color secundario de la paleta
        borderRadius: "8px", // Borde redondeado en todas las esquinas
        border: `1px solid ${theme.palette.secondary.main}`, // Utiliza el color secundario de la paleta para el borde
      }}
    >
      <InputBase
        placeholder="Buscar..."
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{
          color: theme.palette.text.primary, // Usa el color de texto del tema
          background: "white",
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "8px 0 0 8px", // Borde redondeado solo en la esquina superior izquierda
          borderLeftWidth: "1px", // Aumenta el grosor del borde izquierdo
          padding: "4px", // Espacio dentro del campo
        }}
      />
      <IconButton
        color="secondary"
        aria-label="search"
        onClick={() => handleSearch(searchTerm)}
        style={{
          background: theme.palette.secondary.main, // Utiliza el color secundario de la paleta para el fondo del botón
          borderRadius: "0 4px 4px 0",
        }}
      >
        <SearchIcon style={{ color: "white" }} />
      </IconButton>
    </div>
  );
}

export default SearchBar;
