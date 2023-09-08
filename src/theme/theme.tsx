import { createTheme } from "@mui/material/styles";


// Define tus colores personalizados
const customColors = {
  primary: {
    main: "#fff", // Negro como color principal
  },
  secondary: {
    main: "#000", // Blanco como color secundario
  },
  // Agrega más colores personalizados según tus necesidades
};

// Define estilos para los botones
const buttonStyles = {
  contained: {
    backgroundColor: customColors.primary.main, // Color de fondo de los botones contenidos
    color: "#fff", // Color del texto de los botones contenidos
  },
  outlined: {
    borderColor: customColors.primary.main, // Color del borde de los botones contorneados
    color: customColors.primary.main, // Color del texto de los botones contorneados
  },
};

// Crea el tema personalizado
const theme = createTheme({
  palette: {
    primary: customColors.primary,
    secondary: customColors.secondary,
    // Puedes definir más paletas de colores aquí si es necesario
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: buttonStyles.contained,
        outlined: buttonStyles.outlined,
      },
    },
    // Puedes definir estilos para otros componentes aquí
  },
});

export default theme;
