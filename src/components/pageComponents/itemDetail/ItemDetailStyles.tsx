import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:any) => ({
    container: {
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        padding: theme.spacing(5),
      },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    textAlign: "center", 
  },
  productImage: {
    width: "280px",
    marginBottom: theme.spacing(1), 
    borderBottom: "1px solid #000"
  },
  counterButton: {
    backgroundColor: theme.palette.secondary.main, // Color primario del tema
    color: theme.palette.primary.main, // Color secundario del tema
  },
}));

export default useStyles;