import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { CartContext } from '../../../../../../context/CartContext';
import { Link } from 'react-router-dom';

interface SearchBarProps {
  toggleSearch: () => void;
  isSearchOpen: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isSearchOpen, toggleSearch }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext) ?? {};

  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  let total = getTotalPrice ? getTotalPrice() : 0;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        margin: "0 auto",
        background: "#3F51B5",
        borderRadius: "8px",
        border: "1px solid #3F51B5",
      }}
    >
      <IconButton
        color="primary"
        aria-label="shopping cart"
        onClick={handleCartClick}
        sx={{
          background: "#3F51B5",
          color: "#FFFFFF",
        }}
      >
        <ShoppingCartIcon
          sx={{
            color: "#FFFFFF",
          }}
        />
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "1.1rem",
            marginTop: "-20px",
          }}
        >
          0
        </span>
      </IconButton>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sx={{
          width: "100%",
          maxWidth: "411px",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 8px',
            background: "#FFFFFF",
            color: "#000",
            marginBottom: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              color: "#000",
              marginLeft: '24px',
            }}
          >
            Carrito de Compras
          </Typography>
          <IconButton
            color="primary"
            aria-label="close"
            onClick={handleCartClick}
            sx={{
              marginRight: '2px',
              marginLeft: '0',
              fontSize: '24px',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            padding: "16px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.5rem',
              marginBottom: "16px",
            }}
          >
            Carrito de compras
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              marginTop: "16px",
            }}
          >
            Total: $0
          </Typography>
          <Link to="/checkout">Ir al checkout</Link>
          <button onClick={clearCart}>Limpiar Carrito</button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SearchBar;
