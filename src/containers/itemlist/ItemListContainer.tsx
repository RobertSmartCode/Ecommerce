import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import useStyles from './ItemListStyles';


interface Product {
  id: string;
  image: string;
  title: string;
  unit_price: number;
  stock: number;
}

const ItemListContainer: React.FC = () => {

  const classes = useStyles();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        let newArray: Product[] = res.docs.map((product) => {
          return { ...product.data(), id: product.id } as Product;
        });

        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container spacing={1} className={classes.container}>
      {products.map((product) => (
        <Grid item xs={6} sm={6} md={6} lg={6} key={product.id}>
          <Card className={classes.product}>
            <img src={product.image} alt={product.title} className={classes.productImage} />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom className={classes.productTitle}>
                {product.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" className={classes.productPrice}>
                Precio: ${product.unit_price}
              </Typography>
              <div className={classes.buttonContainer}>
                  <Button
                    component={Link}
                    to={`/cart`}
                    className={classes.productCart}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Comprar
                  </Button>
                  {/* Icono del Ojo Aquí se cambian los colores  */}
                  <IconButton
                    component={Link}
                    to={`/itemDetail/${product.id}`}
                    className={classes.productDetail}
                    aria-label="Ver"
                    color="secondary"
                    size="small"
                    sx={{
                      backgroundColor: "#fff", 
                      color: "#000",
                      border: "2px solid #000",
                      borderRadius: '50%',
                      padding: 1,
                    }}
                  >
                    <VisibilityIcon  sx={{ fontSize: '1rem' }}  />
                  </IconButton>
            </div>

            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemListContainer;
