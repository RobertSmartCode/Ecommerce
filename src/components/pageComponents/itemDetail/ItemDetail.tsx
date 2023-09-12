import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Button, Typography, CardContent, Card, CardMedia, CardActions } from "@mui/material";
import { CartContext } from "../../../context/CartContext";

import useStyles from './ItemDetailStyles';

const ItemDetail: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string | undefined }>();
  const { getQuantityById } = useContext(CartContext)!;
  const [product, setProduct] = useState<any>(null);
  const [counter, setCounter] = useState<number>(1); // Valor inicial del contador
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const refCollection = collection(db, "products");
        const refDoc = doc(refCollection, id);
        const docSnapshot = await getDoc(refDoc);

        if (docSnapshot.exists()) {
          setProduct({ ...docSnapshot.data(), id: docSnapshot.id });
        } else {
          console.log("El producto no existe");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addOne = () => {
    if (product && counter < product.stock) {
      setCounter(counter + 1);
    } else {
      setErrorMessage("Stock máximo alcanzado");
      // Establece un temporizador para eliminar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setErrorMessage(null);
      }, 500);
    }
  };

  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      setErrorMessage("No puedes agregar menos de 1 elemento al carrito");
      // Establece un temporizador para eliminar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setErrorMessage(null);
      }, 500);
    }
  };

  return (
    <div className={classes.container}>
      <Card
       sx={{
        display: { xs: "block" },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          height: "100%",
          width: "100%", 
          padding: 0, 
        },
      }}
      >
        <CardMedia
          component="img"
          alt={product?.title}
          height="300"
          image={product?.image}
          title={product?.title}
          className={classes.productImage}
          style={{ borderRadius: "10px" }}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="div">
            {product?.title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Precio: ${product?.unit_price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            className={classes.counterButton}
            onClick={subOne}
          >
            -
          </Button>
          <Typography variant="h4">{counter}</Typography>
          <Button
            variant="contained"
            className={classes.counterButton}
            onClick={addOne}
          >
            +
          </Button>
        </CardActions>
        {errorMessage && (
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        )}
        {getQuantityById(Number(id)) && (
          <Typography variant="h6">
            Ya tienes {getQuantityById(Number(id))} en el carrito
          </Typography>
        )}
        {product?.stock === getQuantityById(Number(id)) && (
          <Typography variant="h6">Ya tienes el máximo en el carrito</Typography>
        )}
      </Card>
    </div>
  );
};

export default ItemDetail;
