import { Button, IconButton, Modal, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Table } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
  width: "90%", // Ancho responsivo al 90% del contenedor padre
  maxWidth: "800px", // Máximo ancho de 800px para evitar que la tabla sea demasiado ancha en pantallas grandes
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
  images: string[];
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
      <TableContainer component={Paper} sx={{ maxWidth: "345px", overflowX: "scroll" }}>
     
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant="head" align="center">Id</TableCell>
              <TableCell variant="head" align="justify">Título</TableCell>
              <TableCell variant="head" align="justify">Precio</TableCell>
              <TableCell variant="head" align="justify">Stock</TableCell>
              <TableCell variant="head" align="justify">Imagen</TableCell>
              <TableCell variant="head" align="justify">Categoria</TableCell>
              <TableCell variant="head" align="justify">Acciones</TableCell>
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
                    src={product.images && product.images[0] ? product.images[0] : ''}
                    alt=""
                    style={{ width: "80px", height: "80px", maxWidth: "100%" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.category}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <IconButton onClick={() => handleOpen(product)}>
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton onClick={() => deleteProduct(product.id)}>
                    <DeleteForeverIcon color="secondary" />
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
