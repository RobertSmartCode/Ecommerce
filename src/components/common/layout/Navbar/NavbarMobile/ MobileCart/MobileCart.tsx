import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { CartContext } from '../../../../../../context/CartContext';
import { Link } from 'react-router-dom';
import useStyles from './MobileCartStyles';


interface MobileCartProps {
  itemCount: number;
  onClick: () => void; // Agrega la prop onClick
}


const MobileCart: React.FC<MobileCartProps> = ({ itemCount }) => {
  const classes = useStyles();
  const [cartOpen, setCartOpen] = useState(false);

  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext) ?? {};



  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  let total = getTotalPrice ? getTotalPrice() : 0;

  return (
    <div className={classes.cartContainer} >
    <IconButton
      color="primary"
      aria-label="shopping cart"
      onClick={handleCartClick}
      className={classes.cartButton}
    >
      <ShoppingCartIcon className={classes.cartIcon} />
      <span className={classes.itemCount}>{itemCount}</span>
    </IconButton>
  
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
    >
      <Box className={classes.topBar}>
      <span className={classes.searchText}>Carrito de Compras</span>
        <IconButton
          color="primary"
          aria-label="close"
          onClick={handleCartClick}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
       
      </Box>
      <Box className={classes.drawerContent}>
        <Typography variant="h6" className={classes.cartTitle}>
          Carrito de compras
        </Typography>
        {cart?.length ?? 0 > 0 ? (
          <>
            <ul>
              {cart?.map((product) => (
                <li key={product.id}>
                  <Box display="flex" alignItems="center">
                    <Typography>{product.title}</Typography>
                    <Typography>{product.quantity}</Typography>
                    <button onClick={() => deleteById && deleteById(product.id)}>
                      Eliminar
                    </button>
                  </Box>
                </li>
              ))}
            </ul>
            <Typography>Total: ${total}</Typography>
            <Link to="/checkout">Ir al checkout</Link>
            <button onClick={clearCart}>Limpiar Carrito</button>
          </>
        ) : (
          <Typography>El carrito está vacío</Typography>
        )}
      </Box>
    </Drawer>
  </div>
  );
};

export default MobileCart;
