import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, IconButton, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Product {
  id: string;
  images: string[];
  title: string;
  unit_price: number;
  stock: number;
}

const ItemListContainer: React.FC = () => {
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

  // Colores personalizados
  const customColors = {
    primary: {
      main: '#000',
      contrastText: '#000',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
  };

  // Estilos con enfoque sx
  const containerStyles = {
    padding: '8px',
  };

  const productStyles = {
    border: "1px solid gray",
    padding: '8px',
    marginBottom: '8px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: customColors.secondary.main,
    color: customColors.primary.main,
  };

  const productImageStyles = {
    width: "100%", 
    marginBottom: '8px',
    borderBottom: "1px solid #000",
  };
  

  const productTitleStyles = {
    fontSize: "1rem",
    fontWeight: "bold",
  };

  const productPriceStyles = {
    fontSize: "1.2rem",
    color: customColors.primary.main,
    marginBottom: '16px',
  };

  const productDetailStyles = {
    backgroundColor: customColors.secondary.main,
    color: customColors.primary.main,
    border: `2px solid ${customColors.primary.main}`,
    borderRadius: '50%',
    padding: '8px',
  };

  const iconStyles = {
    fontSize: '1rem',
  };

  const productCartStyles = {
    backgroundColor:customColors.primary.main,
    color:customColors.secondary.main,
  };

  const buttonContainerStyles = {
    display: "flex",
    gap: '8px',
    marginTop: '16px',
    marginLeft: '32px',
    marginRight: '32px',
    marginBottom: '0px',
  };

  return (
    <Grid container spacing={1} sx={containerStyles}>
      {products.map((product) => (
        <Grid item xs={6} sm={6} md={6} lg={6} key={product.id}>
          <Card sx={productStyles}>
          <img src={product.images[0]} alt={product.title} style={productImageStyles} />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom sx={productTitleStyles}>
                {product.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" sx={productPriceStyles}>
                Precio: ${product.unit_price}
              </Typography>
              <Box sx={buttonContainerStyles}>
                <Button
                  component={Link}
                  to={`/cart`}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={productCartStyles}
                >
                  Comprar
                </Button>
                <IconButton
                  component={Link}
                  to={`/itemDetail/${product.id}`}
                  aria-label="Ver"
                  color="secondary"
                  size="small"
                  sx={productDetailStyles}
                >
                  <VisibilityIcon sx={iconStyles} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemListContainer;
