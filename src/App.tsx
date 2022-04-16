import React from 'react';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

import Header from './Components/Header';
import "./index.css";

import ProductDetail from "./Screens/ProductDetail";
import ProductList from "./Screens/ProductList";
import CreateProduct from "./Screens/CreateProduct";


export interface IApplicationProps {}

declare global {
  interface Window {
      swal:any;
  }
}

const App: React.FunctionComponent<IApplicationProps> = props => {
  let swal = window.swal = withReactContent(Swal);

  return (
    <div className='container max-w-screen-lg pt-6 px-3' >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/detail/:id" element={<ProductDetail />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
 
export default App;