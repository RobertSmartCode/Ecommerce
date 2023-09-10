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
    backgroundColor: customColors.secondary.main, // Color de fondo de los botones contenidos
    color: customColors.primary.main, // Color del texto de los botones contenidos
    borderRadius: "30px",
    fontSize: "0.65rem",
    padding: '4px 8px',
    display: 'flex', // Centra horizontal y verticalmente el contenido
    justifyContent: 'center', // Centra horizontalmente el contenido
    alignItems: 'center',
    boxShadow: "none",
    "&:hover": {
      backgroundColor: customColors.primary.main, // Color de fondo en el hover
      color: customColors.secondary.main
    },
  },
  outlined: {
    borderColor: customColors.primary.main,
    color: customColors.primary.main,
    borderWidth: "2px", // Ancho del borde
    "&:hover": {
      borderColor: "red", // Color del borde en el hover
    },
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
