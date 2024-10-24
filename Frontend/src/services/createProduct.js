import { ENDPOINT_PRODUCT_URL, HTTP_STATUS } from "../../constants/constants";

export const createProduct= async (newProduct) => {
    try {
        const response = await fetch(ENDPOINT_PRODUCT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
    
        if (response.status === HTTP_STATUS.CREATED) {
          return true;  
        } else {
            throw new Error("Error inserting product");
        }
    } catch (error) {
        console.error("Error inserting product:", error);
    }
};