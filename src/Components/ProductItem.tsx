import React from 'react';   
import { Link } from 'react-router-dom';


interface ProductData {
  id: string,
  name: string,
  avatar: string,
  category: string,
  createdAt: string,
  description: string,
  developerEmail: string,
  price: string
}



export interface IProductItemProps {
  data: ProductData
} 

const ProductItem: React.FunctionComponent<IProductItemProps> = (props) => {

  const data = props.data;

  return (
    <Link
      to={"/detail/" + data.id}
      className=''
    >
      <div className='
          flex 
          justify-center 
          content-center 
          bg-white 
          rounded-lg 
          shadow-md
          cursor-pointer
          hover:bg-white-hover  
        ' 
        style={{minHeight: "220px"}}
      >
        <img 
          className='w-11/12 h-auto object-contain'
          src={data.avatar}
          alt=""
        />
      </div>
      <div className='text-sm mt-1' >{data.name}</div>
      <div className='text-sm text-center mt-1' >{data.price}</div>
    </Link>
  )
}
 
export default ProductItem;