// SearchBar.tsx

import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  handleSearch: (searchTerm: string) => void;
}

function SearchBar({ handleSearch }: SearchBarProps) {
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
        onKeyPress={handleKeyPress}
        style={{
          color: "#000000", // Color del texto dentro del campo
          background: "white",
          border: "1px #1976d2",
          padding: "8px", // Espacio dentro del campo
        }}
      />
      <IconButton
        color="secondary"
        aria-label="search"
        onClick={() => handleSearch(searchTerm)}
        style={{
          background: "#1976d2", // Fondo azul (color primario)
          borderRadius: "0 4px 4px 0", // Borde redondeado en el lado derecho
        }}
      >
        <SearchIcon style={{ color: "white" }} />
      </IconButton>
    </div>
  );
}

export default SearchBar;
