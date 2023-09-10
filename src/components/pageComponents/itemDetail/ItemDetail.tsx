import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Button, Typography } from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:any) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    width: "200px",
  },
  counterContainer: {
    display: "flex",
    alignItems: "center",
  },
  counterButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const ItemDetail: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string | undefined }>();
  const { addToCart, getQuantityById } = useContext(CartContext)!;
  const [product, setProduct] = useState<any>(null);
  const [counter, setCounter] = useState<number>(1); // Valor inicial del contador

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
      alert("Stock máximo alcanzado");
    }
  };

  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("No puedes agregar menos de 1 elemento al carrito");
    }
  };

  const onAdd = () => {
    if (product) {
      const obj = {
        ...product,
        quantity: counter,
      };
      addToCart(obj);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">Detalle</Typography>

      {product && (
        <div>
          <Typography variant="h5">{product.title}</Typography>
          <img src={product.image} className={classes.image} alt="" />
        </div>
      )}

      {getQuantityById(Number(id)) && (
        <Typography variant="h6">
          Ya tienes {getQuantityById(Number(id))} en el carrito
        </Typography>
      )}
      {product?.stock === getQuantityById(Number(id)) && (
        <Typography variant="h6">Ya tienes el máximo en el carrito</Typography>
      )}

      <div className={classes.counterContainer}>
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
      </div>
      <Button onClick={onAdd}>Agregar al carrito</Button>
    </div>
  );
};

export default ItemDetail;
