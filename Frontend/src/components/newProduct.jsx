import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from '../context/product';
import { PRODUCT_TYPE } from '../../constants/constants';
import '../styles/newProduct.scss';

export function NewProduct({ productToEdit = null, onClose }) {
    const { products, insertProduct, updateProduct } = useContext(ProductContext);
    const prefix = productToEdit ? "Update" : "Create";
    const [formData, setFormData] = useState({
        name: productToEdit?.name || '',
        code: productToEdit?.code || '',
        productType: productToEdit?.productType || '',
        tax: productToEdit?.tax || 0,
        downloadLink: productToEdit?.downloadLink || ''
    });

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                code: productToEdit.code,
                productType: productToEdit.productType,
                tax: productToEdit.tax,
                downloadLink: productToEdit.downloadLink
            });
        }
    }, [productToEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddProduct = (event) => {
        event.preventDefault();

        const { name, code, productType, tax, downloadLink } = formData;

        if(productToEdit == null){
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

    return (
        <div className="container-modal">
            <br />
            <div className="header">
                <h3>{`${prefix} Product:`}</h3>
            </div>

            <form className="productForm" onSubmit={handleAddProduct}>
                <label htmlFor="name">Product Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder='Laptops'
                    autoComplete="off"
                    required
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="code">Product Code:</label>
                <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    placeholder='AWX43'
                    autoComplete="off"
                    required
                    disabled={!!productToEdit}
                    onChange={handleChange}
                />
                {productToEdit && <small className='msg-validation'>Code is unique, you can't edit it</small>}
                <br />

                <label htmlFor="productType">Product Type:</label>
                <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    required>
                    <option value="">Select Product Type</option>
                    <option value={PRODUCT_TYPE.MATERIAL}>Material Product</option>
                    <option value={PRODUCT_TYPE.DIGITAL}>Digital Product</option>
                </select>
                <br />

                {formData.productType === PRODUCT_TYPE.MATERIAL && (
                    <>
                        <label htmlFor="tax">Shipping Cost:</label>
                        <input
                            type="number"
                            id="tax"
                            name="tax"
                            value={formData.tax}
                            placeholder='0.10'
                            required
                            autoComplete="off"
                            step="0.01"
                            min="0.01"
                            onChange={handleChange}
                        />
                        <br />
                    </>
                )}

                {formData.productType === PRODUCT_TYPE.DIGITAL && (
                    <>
                        <label htmlFor="downloadLink">Download Link:</label>
                        <input
                            type="url"
                            id="downloadLink"
                            name="downloadLink"
                            required
                            value={formData.downloadLink}
                            placeholder='https://example.com'
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <br />
                    </>
                )}

                <button type="submit">{prefix}</button>
            </form>
        </div>
    );
}

NewProduct.propTypes = {
    productToEdit: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
        productType: PropTypes.string,
        tax: PropTypes.number,
        downloadLink: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};

export default NewProduct;