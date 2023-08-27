import React, { createContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  title: string;
  quantity: number;
  unit_price: number; // Añadir el tipo correspondiente si existe en tu proyecto
  stock: number;
}


interface CartContextData {
  cart: Product[];
  addToCart: (product: Product) => void;
  getQuantityById: (id: number) => number | undefined;
  clearCart: () => void;
  deleteById: (id: number) => void;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextData | undefined>(undefined);

interface CartContextComponentProps {
  children: ReactNode;
}

const CartContextComponent: React.FC<CartContextComponentProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>(
    JSON.parse(localStorage.getItem("cart") || "[]") || []
  );

  const addToCart = (product: Product) => {
    let existe = cart.some((e) => e.id === product.id);
    if (existe) {
      let newArr = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return { ...elemento, quantity: product.quantity };
        } else {
          return elemento;
        }
      });
      localStorage.setItem("cart", JSON.stringify(newArr));
      setCart(newArr);
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      setCart([...cart, product]);
    }
  };

  const getQuantityById = (id: number) => {
    let product = cart.find((elemento) => elemento.id === id);
    return product?.quantity;
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const deleteById = (id: number) => {
    const newArr = cart.filter((elemento) => elemento.id !== id);
    localStorage.setItem("cart", JSON.stringify(newArr));
    setCart(newArr);
  };

  const getTotalPrice = () => {
    const total = cart.reduce((acc, elemento) => {
      return acc + elemento.unit_price * elemento.quantity;
    }, 0);
    return total;
  };

  const data: CartContextData = {
    cart,
    addToCart,
    getQuantityById,
    clearCart,
    deleteById,
    getTotalPrice,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
