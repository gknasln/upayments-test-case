import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../Components/Button';
import Loading from '../Components/Loading';

import handleError from '../Helpers/errorHandler';
import UPaymentService from '../service';




export interface IDetailProps {}

const ProductDetail: React.FunctionComponent<IDetailProps> = props => {
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState<any>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UPaymentService.get("products/" + params.id)
    .then(res => {
      setData(res.data);
      setLoading(false);
    })  
    .catch(handleError)
  }, []); //eslint-disable-line


  function handleDelete() {
    window.swal.fire({
      icon: "question",
      title: "Delete Product",
      text: "Are you sure to delete this product?",
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      cancelButtonText: "Cancel",
      cancelButtonColor: "black",
      showCancelButton: true
    })
    .then((data: any) => {
      if(data.isConfirmed){
        setLoading(true);
        UPaymentService.delete("products/" + params.id)
        .then(() => {
          navigate("/");
        })
        .catch(handleError)
        .finally(() => setLoading(false));
      }
    })
  }

  if(loading) return <Loading />


  return (
    <div className='container' >
      <div className='flex justify-between' >
        <div className='w-3/12 bg-white rounded-md shadow-md p-1 md:p-8' >
          <img
            className='w-11/12 object-contain'
            src={data.avatar}
            alt=""
          />
        </div>
        <div className='relative w-9/12 pl-5' >
          <h1 className='text-xl md:text-3xl text-bold' >{data.name}</h1>
          <span className='absolute left-5 bottom-0  text-lg md:text-xl' >{data.price}</span>
        </div>
      </div>
      <hr className='mt-8 mb-10' />
      <h3 className='text-xl font-medium' >Description</h3>
      <div
        dangerouslySetInnerHTML={{__html: data.description}}
      />
      <Button
        title="Delete Product"
        className='w-12/12 md:w-5/12 float-right mt-10'
        onClick={handleDelete}
      />
    </div>
  )
}

export default ProductDetail;
 