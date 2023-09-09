import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:any) => ({

  cartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", 
    margin: "0 auto",

  },
  
  cartButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  cartIcon: {
    color: theme.palette.secondary.main
  },
  itemCount: {
    color:  theme.palette.secondary.main,
    fontSize: "1.1rem",
    marginTop: "-20px"
  },
  drawer: {
    width: "100%",
    maxWidth: "411px",
  },
  drawerContent: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2),
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 8px', // Aumenta el padding vertical
    backgroundColor: theme.palette.secondary.main, // Fondo negro
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(5),
  },
  closeButton: {
    marginRight: '2px', // Espacio entre CloseIcon y la palabra "Buscar"
    marginLeft: '0',
    fontSize: '24px', // Ajusta el tamaño del ícono CloseIcon
  },
  searchText: {
    fontSize: '20px', // Ajusta el tamaño de la palabra "Buscar"
    color: theme.palette.primary.main,
    marginLeft: '24px',
  },
}));

export default useStyles;
