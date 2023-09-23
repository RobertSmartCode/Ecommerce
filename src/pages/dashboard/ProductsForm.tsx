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


import * as Yup from "yup";

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


interface ProductsFormProps {
  handleClose: () => void;
  setIsChange: (value: boolean) => void;
  productSelected: Product | null;
  setProductSelected: (product: Product | null) => void;
  products: Product[];
}

const getFormattedDate = () => {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  return currentDate.toLocaleDateString("es-ES", options);
};

const productSchema = Yup.object().shape({
  title: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  unit_price: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser positivo")
    .moreThan(0, "El precio debe ser mayor que 0"),
  stock: Yup.number()
    .required("El stock es obligatorio")
    .integer("El stock debe ser un número entero")
    .min(0, "El stock debe ser mayor o igual a 0"),
  category: Yup.string().required("La categoría es obligatoria"),
  sku: Yup.string().required("El SKU es obligatorio"),
  // Puedes agregar más validaciones según tus necesidades
});





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
    sizes: [],
    colors: [],
    salesCount: 0,
    featured: false,
    createdAt: getFormattedDate(), 
    keywords: [], 
    discount: 0,
    sku: "", 
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
      const { id, ...productDataWithoutId } = productInfo;
      await addDoc(collectionRef, productDataWithoutId);
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

    // Agregar logs para depuración
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("handleSubmit - Inicio");
    
      try {
        await productSchema.validate(newProduct, { abortEarly: false });
    
        // Resto del código de manejo del formulario si las validaciones pasan
        const productsCollection = collection(db, "products");
        const uploadedImages = await uploadImages();
    
        const productInfo = {
          ...newProduct,
          unit_price: +newProduct.unit_price,
          stock: +newProduct.stock,
          images: uploadedImages,
          keywords: Array.isArray(newProduct.keywords) ? newProduct.keywords.join(', ') : [], 
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
        if (error instanceof Yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {}; // Especificamos el tipo aquí
          error.inner.forEach((e) => {
            if (e.path) { // Verificamos que e.path esté definido antes de acceder a él
              validationErrors[e.path] = e.message;
            }
          });
          console.error("Errores de validación:", validationErrors);
          setSnackbarMessage("Por favor, corrige los errores en el formulario.");
          setSnackbarOpen(true);
        } else {
          console.error("Error en handleSubmit:", error);
          setSnackbarMessage("Error al crear/modificar el producto");
          setSnackbarOpen(true);
        }
      }
    
      console.log("handleSubmit - Fin");
    };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
  
        <Container maxWidth="md" style={{ height: "100vh", overflowY: "auto" }}>
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
                    defaultValue={productSelected?.category}
                    label="Categoría"
                    name="category"
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
                    defaultValue={productSelected?.discount}
                    label="Descuento"
                    name="discount"
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
                    defaultValue={productSelected?.sizes.join(", ")}
                    label="Tallas (Separadas por comas)"
                    name="sizes"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    defaultValue={productSelected?.colors.join(", ")}
                    label="Colores (Separados por comas)"
                    name="colors"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    defaultValue={productSelected?.sku}
                    label="SKU"
                    name="sku"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    defaultValue={productSelected?.keywords.join(", ")}
                    label="Palabras clave (Separadas por comas)"
                    name="keywords"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    defaultValue={productSelected?.salesCount}
                    label="Cantidad de ventas"
                    name="salesCount"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={newProduct.featured}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          featured: e.target.checked,
                        })
                      }
                    />
                    Producto destacado
                  </label>
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
                              style={{ objectFit: "contain" }}
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
