import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles'; // Importa useTheme desde Material-UI

// import { useContext } from "react";
// import { CartContext } from "../../../../../../context/CartContext";
// import { Link } from "react-router-dom";



interface MobileCartProps {
  itemCount: number;
  onClick: () => void;
}

const MobileCart: React.FC<MobileCartProps> = ({ itemCount, onClick }) => {
  const theme = useTheme(); // Obtiene el tema actual
  // const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext) ?? {};
  // let total = getTotalPrice ? getTotalPrice() : 0;

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




// const Cart: React.FC = () => {
  

  
//   return (
//     <div>
//       <h1>Estoy en el carrito</h1>
//       {cart && cart.length > 0 && <Link to="/checkout" style={{ color: "steelblue" }}>Finalizar compra</Link>}
//       {cart?.map((product) => {
//         return (
//           <div key={product.id} style={{ width: "200px", border: "2px solid red" }}>
//             <h6>{product.title}</h6>
//             <h6>{product.quantity}</h6>
//             <button onClick={() => deleteById && deleteById(product.id)}>Eliminar</button>

//           </div>
//         );
//       })}
//       <h5>El total a pagar es {total}</h5>
//       <button onClick={clearCart}>Limpiar carrito</button>
//     </div>
//   );
// };

// export default Cart;

