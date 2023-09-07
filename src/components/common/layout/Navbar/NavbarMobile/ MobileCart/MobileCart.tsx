import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface MobileCartProps {
  itemCount: number; // Cantidad de elementos en el carrito
  onClick: () => void; // Función que se ejecuta al hacer clic en el carrito
}

const MobileCart: React.FC<MobileCartProps> = ({ itemCount, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <ShoppingCartIcon fontSize="large" />
      {itemCount > 0 && (
        <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '4px 8px', fontSize: '12px' }}>
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default MobileCart;
