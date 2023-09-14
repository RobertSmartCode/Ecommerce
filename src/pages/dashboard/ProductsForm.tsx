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
  const [isLoading] = useState<boolean>(false);
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
  const [selectedImageCount, setSelectedImageCount] = useState<number>(
    productSelected?.images.length || 0
  );

  useEffect(() => {
    if (productSelected) {
      setFiles([]);
    }
  }, [productSelected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (
        selectedFiles.length + selectedImageCount <= 8 &&
        selectedFiles.length + selectedImageCount >= 1
      ) {
        setFiles([...files, ...selectedFiles]);
        setSelectedImageCount(selectedImageCount + selectedFiles.length);
        setUploadMessage("");
      } else {
        setUploadMessage(
          "Llegaste al límite de fotos permitido (mínimo 1, máximo 8)."
        );
      }
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
      setUploadMessage("Cargando el producto...");
      const url = await uploadFile(file);
      uploadedImages.push(url);
    }

    setUploadMessage("");
    return uploadedImages;
  };

  const createProduct = async (collectionRef: any, productInfo: any) => {
    try {
      const { id, ...productDataWithoutId } = productInfo; // Elimina el campo 'id' del objeto 'productInfo'
      await addDoc(collectionRef, productDataWithoutId); // Agrega el documento a la colección sin el campo 'id'
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
      const uploadedImages = await uploadImages(); // Subir imágenes al almacenamiento

      const productInfo = {
        ...newProduct,
        unit_price: +newProduct.unit_price,
        stock: +newProduct.stock,
        images: uploadedImages, // Asignar las URLs de las imágenes al producto
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
    <Container maxWidth="md"
    style={{
      height: "100vh", // Ocupa el 100% de la altura de la vista del dispositivo
      overflowY: "auto", // Habilita el scroll vertical si es necesario
    }}
    >
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
              <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
                {files.length > 0 && (
                  <div>
                    {files.map((file, index) => (
                      <Card key={index} style={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={URL.createObjectURL(file)}
                          alt={`Vista Previa ${index + 1}`}
                          style={{ objectFit: "contain" }} // Añade este estilo para ajustar la imagen en dispositivos móviles
                        />
                        <CardContent>
                          <p>{`Vista Previa ${index + 1}`}</p>
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
                              setSelectedImageCount(selectedImageCount - 1);
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
              {selectedImageCount >= 1 && selectedImageCount < 8 && (
                <p>Puedes subir otra foto.</p>
              )}

              {selectedImageCount === 8 && (
                <p>Llegaste al máximo de fotos permitido.</p>
              )}
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
