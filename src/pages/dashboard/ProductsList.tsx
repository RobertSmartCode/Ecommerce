
import { Button, IconButton, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Table } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "../../firebase/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Box from "@mui/material/Box";
import ProductsForm from "./ProductsForm";

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


interface PropsProductosList {
  products: Product[];
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsList: React.FC<PropsProductosList> = ({ products, setIsChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<Product | null>(null);

  const deleteProduct = (id: string) => {
    deleteDoc(doc(db, "products", id));
    setIsChange(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (product: Product | null) => {
    setProductSelected(product);
    setOpen(true);
  };
  

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpen(null)}>
        Agregar nuevo
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">id</TableCell>
              <TableCell align="left">titulo</TableCell>
              <TableCell align="left">precio</TableCell>
              <TableCell align="left">stock</TableCell>
              <TableCell align="left">imagen</TableCell>
              <TableCell align="left">categoria</TableCell>
              <TableCell align="left">acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {product.id}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.title}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.unit_price}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.stock}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.category}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <IconButton onClick={() => handleOpen(product)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <DeleteForeverIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ProductsForm
         handleClose={handleClose}
         setIsChange={setIsChange}
         productSelected={productSelected}
  setProductSelected={setProductSelected}
  products={products} // Asegúrate de pasar esta propiedad
/>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductsList;
