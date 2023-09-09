import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme:any) => ({
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%", 
    margin: "0 auto",
    background: theme.palette.secondary.main,
    borderRadius: "8px",
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  searchInput: {
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.secondary.main}`,
    background: theme.palette.primary.main,
    borderRadius: "8px 0 0 8px",
    padding: "8px",
  },
  searchButton: {
    background: theme.palette.secondary.main,
    borderRadius: "0 4px 4px 0",
  },
  searchDrawer: {
    width: "100%",
    maxWidth: "411px",
    background:theme.palette.primary.main,
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 8px", // Aumenta el padding vertical
    backgroundColor: theme.palette.secondary.main, // Fondo negro
    color: theme.palette.primary.main, 
    marginBottom: theme.spacing(5),   
  },
  closeButton: {
    marginRight: "2px", // Espacio entre CloseIcon y la palabra "Buscar"
    marginLeft: "0",
    fontSize: "24px", // Ajusta el tamaño del ícono CloseIcon
  },
  searchText: {
    fontSize: "20px", // Ajusta el tamaño de la palabra "Buscar"
    color: theme.palette.primary.main, 
  },
}));


export default useStyles;
