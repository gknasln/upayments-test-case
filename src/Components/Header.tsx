import React from 'react';   
import { Link } from 'react-router-dom';

 
export interface IHeaderProps {} 

const Header: React.FunctionComponent<IHeaderProps> = props => {
  return (
    <nav className='container flex justify-between bg-white shadow-md py-3 px-5 rounded-md mb-10'>
      <Link 
        to="/" 
        className='text-xl font-medium hover:text-text-hover' 
      > 
        UPayments Store
      </Link>

      <Link 
        to="/" 
        className='text-md hover:text-text-hover' 
      >
        Register
      </Link>
    </nav>
  )
}
 
export default Header;