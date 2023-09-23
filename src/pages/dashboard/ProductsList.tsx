import  { useEffect, useState } from "react";
import { Button, IconButton, Modal, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Table, Drawer, Typography,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "../../firebase/firebaseConfig";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";


import Box from "@mui/material/Box";
import ProductsForm from "./ProductsForm";
import CloseIcon from "@mui/icons-material/Close";



interface Product {
  id: string;
  title: string;
  description: string;
  unit_price: number;
  stock: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  salesCount: number;
  featured: boolean;
  createdAt: string;
  keywords: string[];
  discount: number;
  sku: string; 
}


const ProductsList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);


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
          images: productData.images,
          sizes: [], // Añade las propiedades faltantes
          colors: [],
          salesCount: 0,
          featured: false,
          createdAt: "",
          keywords: [],
          discount: 0,
          sku: "",
        };
      });
      setProducts(newArr);
    });
  }, [isChange]);

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

  const [listOpen, setListOpen] = useState(false);

  const handleBtnClick = () => {
    setListOpen(!listOpen);
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
      Lista de Productos
    </Button>

    <Drawer
      anchor="left"
      open={listOpen}
      onClose={() => setListOpen(false)}
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
        <Typography sx={textStyles}>Lista de Productos</Typography>
        <IconButton
          aria-label="close"
          onClick={handleBtnClick}
          sx={closeButtonStyles}
        >
          <CloseIcon />
        </IconButton>
      </Box>

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
        <Box >
          <ProductsForm
            handleClose={handleClose}
            setIsChange={setIsChange}
            productSelected={productSelected}
            setProductSelected={setProductSelected}
            products={products}
          />
        </Box>
      </Modal>
      </Drawer>
    </Box>
  );
};

export default ProductsList;
