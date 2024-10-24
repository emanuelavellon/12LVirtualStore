import { useContext, useState } from 'react'
import { Table } from './components/table'
import { NewProduct } from './components/newProduct';
import { Modal } from './components/modal';
import { ProductContext } from './context/product';

function App() {
  const { products } = useContext(ProductContext);
  const [newModalProduct, setNewModalProduct] = useState(false);
  const [productToEdit, setProductToEdit]=useState(null);
  const openModalProduct = () => setNewModalProduct(true);

  const closeModalProduct = () => {
    setNewModalProduct(false)
    setProductToEdit(null)
  };
  
  const editProduct=(product)=>{
    setProductToEdit(product) 
  }

  return (
    <>
      <main>
        <Modal isOpen={newModalProduct || productToEdit!=null} onClose={closeModalProduct}>
          <NewProduct onClose={closeModalProduct} productToEdit={productToEdit}/>
        </Modal>

        <Table products={products} openModalProduct={openModalProduct} editProduct={editProduct}/>
      </main>   
  </> 
  )
}

export default App
