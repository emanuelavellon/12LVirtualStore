import { ENDPOINT_PRODUCT_URL } from "../../constants/constants";

export const updateProduct = async (updatedProduct) => {
    try {
        const response = await fetch(`${ENDPOINT_PRODUCT_URL}/${updatedProduct.code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) { 
            return response.status;
        } else {
            throw new Error(`Error updating product: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error updating product:", error);
        throw error; 
    }
};