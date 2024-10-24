import {useContext, useState} from 'react'
import { ProductContext } from '../context/product';
import { PRODUCT_TYPE } from '../../constants/constants';
import '../styles/newProduct.scss';

export function NewProduct({productToEdit = null, onClose}){
    const { insertProduct, updateProduct } = useContext(ProductContext);
    const prefix= productToEdit === null ? "Create" : "Update";
    const [productType, setProductType] = useState(productToEdit?.productType || '');

    const handleProductTypeChange = (event) => {
        setProductType(event.target.value);
    };

    const handleAddProduct = (event) => {
        event.preventDefault(); 
        

        const name = event.target.elements.name.value;
        const code = event.target.elements.code.value;
        const productType = event.target.elements.productType.value;
        const tax = event.target.elements.tax?.value ?? 0;
        const downloadLink = event.target.elements.downloadLink?.value ?? "";

        let productData = {
            name,
            code,
            productType
        };
        
        if(productType === PRODUCT_TYPE.MATERIAL) {
            productData = {
                ...productData,
                tax,
                downloadLink: ""
            };
        } else if(productType === PRODUCT_TYPE.DIGITAL) {
            productData = {
                ...productData,
                downloadLink,
                tax: 0.00
            };
        } else{
            throw new Error("Invalid product type"); 
        }

        if(productToEdit==null){
            if(productData){
                insertProduct(productData);
            }
              
        }else if(productToEdit.code!=null){ 
            updateProduct(productData);   
        }
        
        event.target.reset();  
        onClose();
    };

    return(
    <div className="container-modal">
        <br />
        <div className="header">
            <h3>{`${prefix} Product:`}</h3>        
        </div>
   
    <form className="productForm" onSubmit={(event)=>handleAddProduct(event)}>
        <label htmlFor="name">Product Name:</label>
        <input type="text" 
            id="name" 
            name="name" 
            defaultValue={productToEdit?.name} 
            placeholder='Laptops' 
            autoComplete="off" 
            required/>
        <br />

        <label htmlFor="code">Product Code:</label>
        <input type="text"
            id="code"
            name="code" 
            defaultValue={productToEdit?.code} 
            placeholder='AWX43' 
            autoComplete="off" 
            required disabled={productToEdit!=null}/>
        {productToEdit != null && <small className='msg-validation'>Code is unique, you can't edit it</small>}
        <br />

        <label htmlFor="productType">Product Type:</label>
        <select id="productType"
            name="productType" 
            value={productType} 
            onChange={handleProductTypeChange} 
            required>
                <option value="">Select Product Type</option>
                <option value={PRODUCT_TYPE.MATERIAL}>Material Product</option>
                <option value={PRODUCT_TYPE.DIGITAL}>Digital Product</option>
        </select>
        <br /> 

        {productType === PRODUCT_TYPE.MATERIAL && (
                <>
                    <label htmlFor="tax">Shipping Cost:</label>
                    <input 
                        type="number" 
                        id="tax" 
                        name="tax" 
                        defaultValue={productToEdit?.tax} 
                        placeholder='0.10' 
                        required
                        autoComplete="off" 
                        step="0.01" 
                        min="0.01" 
                    />
                    <br />
                </>
            )}

            {productType === PRODUCT_TYPE.DIGITAL && (
                <>
                    <label htmlFor="downloadLink">Download Link:</label>
                    <input 
                        type="url" 
                        id="downloadLink" 
                        name="downloadLink" 
                        required
                        defaultValue={productToEdit?.downloadLink} 
                        placeholder='https://example.com' 
                        autoComplete="off" 
                    />
                    <br />
                </>
            )}

        <button type="submit">
          {prefix}
        </button>
    </form>
    </div>
    )
}