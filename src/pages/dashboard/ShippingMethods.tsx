import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {
  Button,
  IconButton,
  Drawer,
  Box,
  Typography,
  TextField,
  Snackbar, 
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "400px",
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24px",
  padding: 4,
};


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

  const topBarStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row", 
    padding: "12px 8px",
    width: "100%",
    margin: "0 auto", 
    backgroundColor: customColors.primary.main,
    color: customColors.secondary.main,
  };

  const closeButtonStyles = {
    color: customColors.secondary.main,
    marginRight: '2px',
    marginLeft: '0',
    fontSize: '24px',
  };

  const textStyles = {
    fontSize: '20px',
    color: customColors.secondary.main,
    marginLeft: '24px',
  };

const ShippingMethods: React.FC = () => {
  const [shipmentCost, setShipmentCost] = useState<number | null>(null);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleBtnClick = () => {
    setShippingOpen(!shippingOpen);
  };

  const handleClose = () => {
    setShippingOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const updateShipment = async () => {
    if (shipmentCost !== null && !isNaN(shipmentCost)) {
      try {
        await updateDoc(doc(db, "shipment", "HxMuNKLUglVoHjAyosML"), {
          cost: shipmentCost,
        });
        setSnackbarMessage("Costo de envío actualizado con éxito.");
        setSnackbarOpen(true);
        setShippingOpen(false);
      } catch (error) {
        console.error("Error al actualizar el costo de envío:", error);
        setSnackbarMessage("Error al actualizar el costo de envío.");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Ingresa un valor válido para el costo de envío.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box>
      <Button 
      variant="contained"
      onClick={handleBtnClick}
      sx={{
        backgroundColor: customColors.primary.main,
        color: customColors.secondary.contrastText,
      }}
      >
        Métodos de envío
      </Button>

      <Drawer
        anchor="left"
        open={shippingOpen}
        onClose={handleClose}
        sx={{
          display: { xs: "block" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            zIndex: 1300,
          },
        }}
      >
        <Box sx={topBarStyles}>
          <Typography sx={textStyles}>Configuración de Envío</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={closeButtonStyles}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={style}>
          <TextField
            label="Costo"
            type="number" // Asegura que solo se ingresen números.
            onChange={(e) => setShipmentCost(+e.target.value)}
            value={shipmentCost !== null ? shipmentCost.toString() : ""}
          />
          <Button onClick={updateShipment}>Modificar</Button>
        </Box>
      </Drawer>

      {/* Snackbar para mostrar mensajes al usuario */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Puedes ajustar la duración del mensaje.
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ShippingMethods;
