import { useContext } from 'react';
import { ProductContext } from '../context/product';
import { PRODUCT_TYPE } from '../../constants/constants';

const useProductPersistence = (productToEdit, formData, onClose) => {
    const { products, insertProduct, updateProduct } = useContext(ProductContext);

    const handleAddProduct = (event) => {
        event.preventDefault();

        const { name, code, productType, tax, downloadLink } = formData;

        if (productToEdit == null) {
            const existingCodeProduct = products.find(product => product.code === code);
    
            if (existingCodeProduct) {
                alert(`Code: ${code} Already Exists. Specify another`);
                return; 
            }
        }

        let productData = {
            name,
            code,
            productType
        };

        if (productType === PRODUCT_TYPE.MATERIAL) {
            productData.tax = tax;
            productData.downloadLink = ""; 
        } else if (productType === PRODUCT_TYPE.DIGITAL) {
            productData.downloadLink = downloadLink;
            productData.tax = 0.00; 
        } else {
            throw new Error("Invalid product type");
        }

        if (!productToEdit) {
            insertProduct(productData);
        } else {
            updateProduct(productData);
        }

        event.target.reset();
        onClose();
    };

    return { handleAddProduct };
};

export default useProductPersistence;