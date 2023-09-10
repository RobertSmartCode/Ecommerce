import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:any) => ({
  container: {
    padding: theme.spacing(2),
  },
  product: {
    border: "1px solid gray",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    textAlign: "center", 
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main, 
  },
  productImage: {
    width: "200px",
    marginBottom: theme.spacing(1), 
  },
  productTitle: {
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: "0.4rem",
    color: theme.palette.secondary.main,
  },
  productStock: {
    fontSize: "0.1rem",
  },
  productDetail: {
    textDecoration: "none",
    backgroundColor: theme.palette.secondary.main, 
    color: theme.palette.primary.main, 
  },
  productCart: {
    fontSize: "0.875rem", 
    backgroundColor: theme.palette.secondary.main, 
    color: theme.palette.primary.main, 
  },
  buttonContainer: {
    display: "flex",
    gap: theme.spacing(2),
  },
}));



export default useStyles;