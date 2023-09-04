import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
// import ShopIcon from '@mui/icons-material/Shop';
import LoginIcon from '@mui/icons-material/Login';


interface MenuItem {
  id: string;
  path: string;
  title: string;
  Icon: React.ComponentType;
}

export const menuItems: MenuItem[] = [
  {
    id: "home",
    path: "/",
    title: "Inicio",
    Icon: HomeIcon
  },
  {
    id: "products",
    path: "/shop",
    title: "Tienda",
    Icon: StoreIcon
  },
  {
    id: "cart",
    path: "/cart",
    title: "Carrito",
    Icon: ShoppingCartCheckoutIcon
  },
  // {
  //   id: "login",
  //   path: "/login",
  //   title: "Iniciar Sesión",
  //   Icon: LoginIcon
  // },
  // {
  //   id: "userOrders",
  //   path: "/user-orders",
  //   title: "Mis compras",
  //   Icon: ShopIcon
  // }
 
];