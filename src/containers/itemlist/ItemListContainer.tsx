import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  image: string;
  title: string;
  unit_price: number;
  stock: number;
}

const ItemListContainer: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        let newArray: Product[] = res.docs.map((product) => {
          return { ...product.data(), id: product.id } as Product;
        });

        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Estoy en el shop</h1>

      {products.map((product) => (
        <div key={product.id} style={{ border: "2px solid black" }}>
          <img src={product.image} style={{ width: "200px" }} alt="" />
          <h4>{product.title}</h4>
          <h4>{product.unit_price}</h4>
          <h4>{product.stock}</h4>
          <Link to={`/itemDetail/${product.id}`}>Ver detalle</Link>
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;
