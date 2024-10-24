import { createContext, useState, useEffect, useCallback } from "react";
import { useGetProduct } from "../services/getProduct";
import { createProduct } from "../services/createProduct";
import { deleteProduct as deleteProductService } from "../services/removeProduct";
import { updateProduct as updateProductService } from "../services/updateProduct";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProduct] = useState([]);
  const { fetchProducts } = useGetProduct();

  const setInitialProduct = useCallback((products) => {
    setProduct(products);
  }, []);

  const insertProduct = async (product) => {
    try {
      const response = await createProduct(product);
      if (response) {
        const updatedProduct = await fetchProducts();
        setInitialProduct(updatedProduct);
      }
    } catch (error) {
      console.error("Error inserting product:", error);
    }
  }

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await updateProductService(updatedProduct);
      if (response) {
        const updatedProduct = await fetchProducts();
        setInitialProduct(updatedProduct);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  const deleteProduct = async (code) => {
    try {
      const response = await deleteProductService(code);
      if (response) {
        const updatedProduct = await fetchProducts();
        setInitialProduct(updatedProduct);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {
    fetchProducts().then(setInitialProduct);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        insertProduct,
        updateProduct,
        deleteProduct
      }}>
      {children}
    </ProductContext.Provider>
  );
}