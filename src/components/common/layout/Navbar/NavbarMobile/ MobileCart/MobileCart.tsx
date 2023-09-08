import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles'; // Importa useTheme desde Material-UI

interface MobileCartProps {
  itemCount: number;
  onClick: () => void;
}

const MobileCart: React.FC<MobileCartProps> = ({ itemCount, onClick }) => {
  const theme = useTheme(); // Obtiene el tema actual

  return (
    <IconButton
      color="primary"
      aria-label="shopping cart"
      onClick={onClick}
      style={{
        backgroundColor: theme.palette.primary.main, // Define el color de fondo usando el tema
        color: theme.palette.primary.contrastText, // Define el color del texto usando el tema
      }}
    >
      <ShoppingCartIcon />
      <span>{itemCount}</span>
    </IconButton>
  );
};

export default MobileCart;
