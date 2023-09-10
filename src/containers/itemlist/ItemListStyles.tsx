import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:any) => ({
  container: {
    padding: theme.spacing(2),
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
    width: "300px",
    marginBottom: theme.spacing(1), 
    borderBottom: "2px solid #000"
  },
  productTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  productPrice: {
    fontSize: "1rem",
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
  productStock: {
    fontSize: "1rem",
  },
  productDetail: {
    backgroundColor: theme.palette.secondary.main, 
    color: theme.palette.primary.main, 
  },
  productCart: {
    backgroundColor: theme.palette.secondary.main, 
    color: theme.palette.primary.main, 
  },
  buttonContainer: {
    display: "flex",
    gap: theme.spacing(1),
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },
}));



export default useStyles;