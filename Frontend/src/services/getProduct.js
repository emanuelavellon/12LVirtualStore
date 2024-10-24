import { ENDPOINT_PRODUCT_URL } from "../../constants/constants";
import { useState, useCallback } from "react";

export const useGetProduct = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        return fetch(ENDPOINT_PRODUCT_URL)
            .then(response => {
                if (!response.ok){
                    throw new Error(`Error during request: ${response.statusText}`);
                }
                return response.json();
            })
            .then(productList => {
                if (productList.length > 0) {
                    setProducts(productList);
                }
                return productList;
            })
            .catch(err => {
                console.error(err);
                return [];
            });
    }, []);

    return { products, fetchProducts };
};