import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Button, Typography, CardContent, Card, CardActions, Box } from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const { getQuantityById } = useContext(CartContext)!;
  const [product, setProduct] = useState<any>(null);
  const [counter, setCounter] = useState<number>(1);
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
      setTimeout(() => {
        setErrorMessage(null);
      }, 500);
    }
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
    }}>
      <Card
        sx={{
          display: "block",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            height: "100%",
            width: "100%",
            padding: 0,
          },
        }}
      >
        <Carousel
          showThumbs={false}
          dynamicHeight={true}
          emulateTouch={true} // Habilitar el deslizamiento táctil en dispositivos móviles
        >
          {product?.images.map((image: string, index: number) => (
            <div key={index}>
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                style={{ borderRadius: "10px", width: "100%", maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          ))}
        </Carousel>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Typography variant="h5" component="div">
            {product?.title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Precio: ${product?.unit_price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" sx={{ backgroundColor: 'secondary.main', color: 'primary.main' }} onClick={subOne}>
            -
          </Button>
          <Typography variant="h4">{counter}</Typography>
          <Button variant="contained" sx={{ backgroundColor: 'secondary.main', color: 'primary.main' }} onClick={addOne}>
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
    </Box>
  );
};

export default ItemDetail;
