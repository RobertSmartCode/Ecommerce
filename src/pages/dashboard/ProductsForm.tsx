import React, { useState, useEffect, useRef } from "react";
import { db, uploadFile } from "../../firebase/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import {
  Button,
  TextField,
  Grid,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Container,
  Paper,
} from "@mui/material";

interface Product {
  id: string;
  title: string;
  description: string;
  unit_price: number;
  stock: number;
  category: string;
  images: string[];
}

interface ProductsFormProps {
  handleClose: () => void;
  setIsChange: (value: boolean) => void;
  productSelected: Product | null;
  setProductSelected: (product: Product | null) => void;
  products: Product[];
}

const ProductsForm: React.FC<ProductsFormProps> = ({
  handleClose,
  setIsChange,
  productSelected,
  setProductSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    unit_price: 0,
    stock: 0,
    category: "",
    images: [],
  });

  const [files, setFiles] = useState<File[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState<string>("");

  useEffect(() => {
    if (productSelected) {
      setFiles([]);
    }
  }, [productSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (productSelected) {
      setProductSelected({
        ...productSelected,
        [name]: value,
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const uploadImages = async () => {
    const uploadedImages = [];

    for (const file of files) {
      setUploadMessage("Subiendo imágenes...");
      const url = await uploadFile(file);
      uploadedImages.push(url);
    }

    setUploadMessage("");
    return uploadedImages;
  };

  const createProduct = async (collectionRef: any, productInfo: any) => {
    try {
      await addDoc(collectionRef, productInfo);
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const updateProduct = async (
    collectionRef: any,
    productId: string,
    productInfo: any
  ) => {
    try {
      await updateDoc(doc(collectionRef, productId), productInfo);
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productsCollection = collection(db, "products");

    try {
      const uploadedImages = await uploadImages();

      const productInfo = {
        ...newProduct,
        unit_price: +newProduct.unit_price,
        stock: +newProduct.stock,
        images: uploadedImages,
      };

      if (productSelected) {
        await updateProduct(
          productsCollection,
          productSelected.id,
          productInfo
        );
      } else {
        await createProduct(productsCollection, productInfo);
      }

      setFiles([]);
      setSnackbarMessage("Producto creado/modificado con éxito");
      setSnackbarOpen(true);
      setIsChange(true);
      handleClose();
    } catch (error) {
      setSnackbarMessage("Error al crear/modificar el producto");
      setSnackbarOpen(true);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                defaultValue={productSelected?.title}
                label="Nombre"
                name="title"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                defaultValue={productSelected?.description}
                label="Descripción"
                name="description"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                defaultValue={productSelected?.unit_price}
                label="Precio"
                name="unit_price"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                defaultValue={productSelected?.stock}
                label="Stock"
                name="stock"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                defaultValue={productSelected?.category}
                label="Categoría"
                name="category"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
  <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
    {files.length > 0 && (
      <div>
        {files.map((file, index) => (
          <Card key={index} style={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="auto" // Ajustar automáticamente la altura de la imagen
              image={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
            />
            <CardContent>
              <p>{`Preview ${index + 1}`}</p>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => {
                  const updatedFiles = [...files];
                  updatedFiles.splice(index, 1);
                  setFiles(updatedFiles);
                }}
              >
                Eliminar
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    )}
  </div>
</Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={openFileInput}
              >
                Subir foto
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <p>{uploadMessage}</p>
            </Grid>

            <Grid item xs={12}>
              {!isLoading && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {productSelected ? "Modificar" : "Crear"}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ProductsForm;
