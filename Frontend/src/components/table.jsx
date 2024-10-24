import {useState, useContext} from 'react';
import { ProductContext } from '../context/product';
import {Modal} from '../components/modal';
import { ConfirmDelete } from './confirmDelete';
import "../styles/table.scss";

export function Table({products, openModalProduct, editProduct}){ 
    const {deleteProduct} = useContext(ProductContext)
    const [showConfirmDelete, setShowConfirmDelete] = useState({state: false, product: null});

    const handleDeleteConfirm=(product)=>{
        setShowConfirmDelete({
            state: true,
            product
        });
       
    }
    const handleDeleteProduct=()=>{
         deleteProduct(showConfirmDelete.product.code);
         setShowConfirmDelete({
            state: false,
            product: null
        });
    }

    return(
        <>
        <Modal isOpen={showConfirmDelete.state} _height={"180px"} onClose={()=>setShowConfirmDelete({state: false, id: null})}>
           <ConfirmDelete product={showConfirmDelete} onDelete={handleDeleteProduct}/>
        </Modal>
            <div className="container">
                <div className="header">
                    <h2>&nbsp;Product Management</h2>
                    <div>
                        <button className="btn btn-add" onClick={()=>openModalProduct()}>
                            <span className="material-symbols-outlined">
                                add_circle
                            </span>
                            &nbsp;New Product
                        </button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>PRODUCT NAME</th>
                            <th>PRODUCT CODE</th>
                            <th>PRODUCT TYPE</th>
                            <th>SHIPPING TAX</th>
                            <th>DOWNLOAD LINK</th>
                            <th className='actions'>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No products added yet</td>
                            </tr>
                        ) : (
                    products.map((product)=>{
                        return (
                            <tr key={product.id}>
                                <td>
                                    {product.name}
                                </td>
                                <td>
                                    {product.code}
                                </td>
                                <td>
                                    {product.productType}
                                </td>
                                <td>
                                   {product.tax !== null && product.tax != 0 ? product.tax : '-'}
                                </td>
                                <td>
                                {product.downloadLink ? (
                                        <a href={product.downloadLink} target="_blank" rel="noopener noreferrer">
                                            {product.downloadLink}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="action-icons">
                                    <button className='btn btn-edit' onClick={()=>editProduct(product)}>
                                        <span>
                                            <span className="material-symbols-outlined">
                                            edit
                                            </span>
                                        </span>
                                    </button>
                                    <button className='btn btn-delete' onClick={()=>handleDeleteConfirm(product)}>
                                        <span>
                                            <span className="material-symbols-outlined">
                                            delete
                                            </span>
                                        </span>
                                    </button>    
                                </td> 
                            </tr>
                        )
                    }))
                }   
                    </tbody>
                </table>
            </div>
        </>
    )
}
