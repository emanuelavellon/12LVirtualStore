import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProductProvider } from './context/product.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ProductProvider>
       <App />
    </ProductProvider>
)
