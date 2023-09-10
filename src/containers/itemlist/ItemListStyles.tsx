import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:any) => ({
  container: {
    padding: theme.spacing(1),
  },
  product: {
    border: "1px solid gray",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    textAlign: "center", 
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main, 
  },
  productImage: {
    width: "280px",
    marginBottom: theme.spacing(1), 
    borderBottom: "1px solid #000"
  },
  productTitle: {
    fontSize: "1rem",
    fontWeight: "bold"
  },
  productPrice: {
    fontSize: "1.2rem",
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
  productDetail: {
    backgroundColor: theme.palette.primary.main, 
    color: theme.palette.secondary.main,  
    border: `2px solid ${theme.palette.secondary.main}`, // Color del delineado secundario
    borderRadius: '50%', // Para hacer un círculo
    padding: theme.spacing(1), // Espaciado inter
  },
  icon: {
    fontSize: '1rem', // Tamaño del ícono (ajusta según tus preferencias)
  },
  productCart: {
    backgroundColor: theme.palette.secondary.main, 
    color: theme.palette.primary.main, 
  },
  buttonContainer: {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginBottom: '0px'
  },
}));



export default useStyles;