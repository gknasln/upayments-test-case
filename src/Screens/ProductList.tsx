import React, { useEffect, useRef, useState } from 'react'; 

import Input from '../Components/Input';
import Loading from '../Components/Loading';
import ProductItem from '../Components/ProductItem';
import Select from '../Components/Select';

import UPaymentService from '../service';
import handleError from '../Helpers/errorHandler';
import { useNavigate } from 'react-router-dom';


export interface IProductListProps {}


const ProductList: React.FunctionComponent<IProductListProps> = props => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(document.createElement("div"));
  const searchTimeout = useRef<any>();

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("none");

  const [products, setProducts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [ready, setReady] = useState(false);



  useEffect(() => {
    Promise.all([
      UPaymentService.get("products"),
      UPaymentService.getCategories()
    ])
    .then(responses => {
      setProducts(fixProductData(responses[0].data));
      setFilteredList(fixProductData(responses[0].data));
      setCategories(responses[1]);
      setReady(true);
      
    })
    .catch(e => handleError(e));
  }, []);


  useEffect(() => {
    if(ready){
      setTimeout(() => {
        listRef.current.style.opacity = "1";
      }, 100);
    }
  }, [ready]);

  useEffect(() => {
    if(!ready) return;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(filterProducts, 600);
  }, [searchText, selectedCategory]);





  function filterProducts() { 
    console.log(selectedCategory, searchText);
    setFilteredList(products.filter((product: any) => {
      let category = true;
      if(selectedCategory !== "none")
        category = selectedCategory === product.category;

      return (
        product.name.toLowerCase().includes(searchText.toLowerCase()) && category
      )
    }));
  }


  if(!ready)
    return <Loading />


  return (
    <div className='container pb-10'>
      <div className='md:flex md: justify-between mb-8' >
        <Input 
          value={searchText}
          onChange={setSearchText}
          placeholder='Apple Watch, Samsung S21, Macbook Pro, ...'
          className="w-12/12 mb-5 md:w-4/12 md:mb-10"
        />

        <Select 
          value={selectedCategory}
          onChange={setSelectedCategory}
          className='w-12/12 md:w-4/12'
          options={categories}
          placeholder="Select Category"
        />
      </div>


      <div 
        ref={listRef}
        className='
          relative 
          grid 
          grid-cols-2
          gap-4 
          md:grid-cols-4
          max-w-screen-md 
          m-auto 
          pb-12 
          duration-500 
          opacity-0
        ' 
      >
        {
          filteredList.map((product: any) => {
            return (
              <ProductItem 
                key={"product-item-" + product.id}
                data={product}
              />  
            )
          })
        }
        <button 
          onClick={() => navigate("/create-product")}
          className='
            absolute 
            bottom-0 
            right-0
            pb-1
            rounded-full
            bg-black
            hover:bg-black-hover
            text-2xl
            w-12
            h-12 
            text-white 
            border-none 
            outline-none' 
          >
          +
        </button>
      </div>
    </div>
  )
}
 
export default ProductList;




// Data was incoming corruptes from the api. I guess someone else is trying to do something with same api
function fixProductData(data: any) {
  return data.map((product: any) => {
    if(Array.isArray(product.name))
      product.name = product.name[0];
    
    if(Array.isArray(product.avatar))
      product.avatar = product.avatar[0];
    
    if(Array.isArray(product.developerEmail))
      product.developerEmail = product.developerEmail[0];
    
    if(Array.isArray(product.price))
      product.price = product.price[0];
    
    if(Array.isArray(product.description))
      product.description = product.description[0];
    
    return product;
  })
}

