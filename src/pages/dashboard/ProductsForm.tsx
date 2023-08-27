import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { db, uploadFile } from "../../firebase/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

interface Product {
  id: string;
  title: string;
  description: string;
  unit_price: number;
  stock: number;
  category: string;
  image: string;
}

  
interface ProductsFormProps {

  handleClose: () => void;
  setIsChange: (value: boolean) => void;
  productSelected: Product | null;
  setProductSelected: (product: Product | null) => void;
  products: Product[]
}

const ProductsForm: React.FC<ProductsFormProps> = ({
  handleClose,
  setIsChange,
  productSelected,
  setProductSelected,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id:"",
    title: "",
    description: "",
    unit_price: 0,
    stock: 0,
    category: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleImage = async () => {
    setIsLoading(true);
    if (file) {
      let url = await uploadFile(file);
  
      if (productSelected) {
        setProductSelected({ ...productSelected, image: url });
      } else {
        setNewProduct({ ...newProduct, image: url });
      }
  
      setIsLoading(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productsCollection = collection(db, "products");

    if (productSelected) {
      let obj = {
        ...productSelected,
        unit_price: +productSelected.unit_price,
        stock: +productSelected.stock,
      };
      updateDoc(doc(productsCollection, productSelected.id), obj).then(() => {
        setIsChange(true);
        handleClose();
      });
    } else {
      let obj = {
        ...newProduct,
        unit_price: +newProduct.unit_price,
        stock: +newProduct.stock,
      };
      addDoc(productsCollection, obj).then(() => {
        setIsChange(true);
        handleClose();
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          defaultValue={productSelected?.title}
          label="nombre"
          name="title"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.description}
          label="descripcion"
          name="description"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.unit_price}
          label="precio"
          name="unit_price"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.stock}
          label="stock"
          name="stock"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          defaultValue={productSelected?.category}
          label="categoria"
          name="category"
          onChange={handleChange}
        />
        <TextField
         type="file"
         onInput={(e) => setFile((e.target as HTMLInputElement)?.files?.[0] ?? null)}
        />

        {file && (
          <Button onClick={handleImage} type="button">
            Cargar imagen
          </Button>
        )}
        {file && !isLoading && (
          <Button variant="contained" type="submit">
            {productSelected ? "modificar" : "crear"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ProductsForm;
