import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import ProductsList from "./ProductsList";
import { Box, Button, Modal, TextField } from "@mui/material";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24px",
  padding: 4,
};

interface Product {
  id: string;
  title: string;
  description: string;
  unit_price: number;
  stock: number;
  category: string;
  image: string;
}



const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [shipmentCost, setShipmentCost] = useState<number | null>(null);

  useEffect(() => {
    setIsChange(false);
    let productsCollection = collection(db, "products");
    getDocs(productsCollection).then((res) => {
      const newArr: Product[] = res.docs.map((productDoc) => {
        const productData = productDoc.data();
        return {
          id: productDoc.id,
          title: productData.title,
          description: productData.description, 
          unit_price: productData.unit_price,
          stock: productData.stock,
          category: productData.category, 
          image: productData.image, 
        };
      });
      setProducts(newArr);
    });
  }, [isChange]);

  const handleClose = () => {
    setOpen(false);
  };

  const updateShipment = async () => {
    if (shipmentCost !== null) {
      await updateDoc(doc(db, "shipment", "HxMuNKLUglVoHjAyosML"), { cost: shipmentCost });
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Costo de envio
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Costo"
            onChange={(e) => setShipmentCost(+e.target.value)}
          />
          <Button onClick={updateShipment}>Modificar</Button>
        </Box>
      </Modal>
      {/* Pasa la propiedad 'products' al componente ProductsList */}
      <ProductsList products={products} setIsChange={setIsChange} />
    </div>
  );
};

export default Dashboard;