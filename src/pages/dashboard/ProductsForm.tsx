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
  category: string;
  unit_price: number;
  discount: number;
  stock: number;
  sizes: string[];
  colors: string[];
  sku: string;
  keywords: string[];
  salesCount: number;
  // featured: boolean;
  images: string[];
  createdAt: string;
}


interface ProductsFormProps {
  handleClose: () => void;
  setIsChange: (value: boolean) => void;
  productSelected: Product | null;
  setProductSelected: (product: Product | null) => void;
  products: Product[];
}

const getFormattedDate = (): string => {
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
    category: "",
    unit_price: 0,
    discount: 0,
    stock: 0,
    sizes: [],
    colors: [],
    images: [],
    sku: "", 
    keywords: [], 
    salesCount: 0,
    // featured: false,
    createdAt: getFormattedDate(), 
    
    
  });


 // Estado para las imágenes existentes
 const [files, setFiles] = useState<File[]>([]);


 // Estado para las imágenes recién cargadas desde la computadora


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [selectedImageCount, setSelectedImageCount] = useState<number>(
    productSelected?.images.length || 0
  );



  useEffect(() => {
    const loadImages = () => {
      if (productSelected) {
        setFiles(productSelected.images.map((imageUrl) => new File([], imageUrl)));
      } else {
        setFiles(newProduct.images.map((imageUrl) => new File([], imageUrl)));
      }
    };
  
    loadImages();
  }, [productSelected, newProduct]);
  
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (
        selectedFiles.length + selectedImageCount <= 8 &&
        selectedFiles.length + selectedImageCount >= 1
      ) {
        const updatedFiles = [...files, ...selectedFiles];
        setFiles(updatedFiles);
        setSelectedImageCount(selectedImageCount + selectedFiles.length);
        setUploadMessage("");
        if (productSelected) {
          const updatedProductSelected = {
            ...productSelected,
            images: [
              ...productSelected.images,
              ...selectedFiles.map((file) => URL.createObjectURL(file)),
            ],
          };
          setProductSelected(updatedProductSelected);
        }
  
        
      } else {
        setUploadMessage(
          "Llegaste al límite de fotos permitido (mínimo 1, máximo 8)."
        );
      }
    }
  };
  


// Función para manejar la eliminación de imágenes existentes

const handleRemoveImage = (index: number) => {
  const updatedFiles = [...files];
  updatedFiles.splice(index, 1);
  setFiles(updatedFiles);

  if (productSelected) {
    const updatedProductSelected = {
      ...productSelected,
      images: [...productSelected.images.slice(0, index), ...productSelected.images.slice(index + 1)],
    };
    setProductSelected(updatedProductSelected);
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
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  // Función para subir las imágenes al servidor y obtener las URL
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


  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


   // Función para manejar el envío del formulario
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Validar el producto, ya sea el nuevo o el editado
      const productToValidate = productSelected || newProduct;
      await productSchema.validate(productToValidate, { abortEarly: false });
  
      // Subir las imágenes y obtener las URLs
      const uploadedImages = await uploadImages();
  
      // Crear un objeto con la información del producto
      const productInfo = {
        ...productToValidate,
        unit_price: +productToValidate.unit_price,
        stock: +productToValidate.stock,
        createdAt: productToValidate.createdAt ?? getFormattedDate(),
      };
  
      const productsCollection = collection(db, "products");



      if (productSelected) {
        // Actualizar el producto existente sin duplicar las imágenes
        productInfo.images = productSelected.images; // Utiliza las imágenes existentes
        await updateProduct(productsCollection, productSelected.id, productInfo);
      } else {
        // Crear un nuevo producto con las imágenes cargadas
        productInfo.images = [...uploadedImages];
        await createProduct(productsCollection, productInfo);
      }

  
      // Limpiar el estado y mostrar un mensaje de éxito
      setFiles([]);
      setSnackbarMessage("Producto creado/modificado con éxito");
      setSnackbarOpen(true);
      setIsChange(true);
      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Manejar errores de validación aquí
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) {
            validationErrors[e.path] = e.message;
          }
        });
        console.error("Errores de validación:", validationErrors);
        setSnackbarMessage("Por favor, corrige los errores en el formulario.");
        setSnackbarOpen(true);
      } else {
        // Manejar otros errores aquí
        console.error("Error en handleSubmit:", error);
        setSnackbarMessage("Error al crear/modificar el producto");
        setSnackbarOpen(true);
      }
    }
  };
  
  

  return (
  
        <Container 

        maxWidth="xs"
        sx={{
          height: "100vh",
          overflowY: "auto",
          marginLeft: "auto",
          marginRight: "auto", 
          padding: "20px", 
          border: "1px solid #ccc", 
        }}
       
        >
          <Paper elevation={3} style={{ padding: "20px" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                marginLeft: "40px", 
                marginRight: "40px",
                gap: "20px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    defaultValue={productSelected ? productSelected.title : newProduct.title}
                    label="Nombre"
                    name="title"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    defaultValue={productSelected ? productSelected.description : newProduct.description}
  
                    label="Descripción"
                    name="description"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                   
                    defaultValue={productSelected ? productSelected.category : newProduct.category}
  
                    label="Categoría"
                    name="category"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
      
                    defaultValue={productSelected ? productSelected.unit_price: newProduct.unit_price}
  
                    label="Precio"
                    name="unit_price"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                   
                    defaultValue={productSelected ? productSelected.discount : newProduct.discount}
  
                    label="Descuento"
                    name="discount"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                  
                    defaultValue={productSelected ? productSelected.stock : newProduct.stock}
  
                    label="Stock"
                    name="stock"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    
                    defaultValue={productSelected ? productSelected.sizes : newProduct.sizes}
                    label="Talles (Separados por comas)"
                    name="sizes"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    
                    defaultValue={productSelected ? productSelected.colors : newProduct.colors}
  
                    label="Colores (Separados por comas)"
                    name="colors"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
  
                    defaultValue={productSelected ? productSelected.sku : newProduct.sku}
  
                    label="SKU"
                    name="sku"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                   
                    defaultValue={productSelected ? productSelected.keywords: newProduct.keywords}
  
                    label="Palabras clave (Separadas por comas)"
                    name="keywords"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
          
                    defaultValue={productSelected ? productSelected.salesCount: newProduct.salesCount}
  
                    label="Cantidad de ventas"
                    name="salesCount"
                    onChange={handleChange}
                  />
                </Grid>

{/*                 
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
                </Grid> */}


                <Grid item xs={12}>
                  <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    {productSelected ? (
                      productSelected.images.map((imageUrl, index) => (
                        <Card key={index} style={{ maxWidth: 345 }}>
                          <CardMedia
                            component="img"
                            height="140"
                            image={imageUrl}
                            alt={`Imagen ${index + 1}`}
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
                              onClick={() => handleRemoveImage(index)}
                            >
                              Eliminar
                            </Button>
                          </CardActions>
                        </Card>
                      ))
                    ) : (
                      files.map((file, index) => (
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
                              onClick={() => handleRemoveImage(index)}
                            >
                              Eliminar
                            </Button>
                          </CardActions>
                        </Card>
                      ))
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
                    onChange={handleImageChange}
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
