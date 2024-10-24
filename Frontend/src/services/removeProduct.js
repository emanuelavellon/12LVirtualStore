 import { ENDPOINT_PRODUCT_URL } from "../../constants/constants";

 export const deleteProduct = async (productId) => {
        try {
            console.log(productId)
            const response = await fetch(`${ENDPOINT_PRODUCT_URL}/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                return response.status;
            } else {
                throw new Error(`Error deleting product: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };