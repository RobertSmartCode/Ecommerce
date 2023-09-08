import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import AuthContextComponent from "./context/AuthContext";
import theme from "./theme/theme"; 
import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';




function App() {

  return (
  <ThemeProvider theme={theme}>
  <CssBaseline />
  <BrowserRouter>
    <CartContextComponent>
      <AuthContextComponent>
        <AppRouter />
      </AuthContextComponent>
    </CartContextComponent>
  </BrowserRouter>

  </ThemeProvider>

  );
}

export default App;
