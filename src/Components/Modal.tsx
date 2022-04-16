import React from 'react';   

 
export interface IModalProps {} 

const Modal: React.FunctionComponent<IModalProps> = props => {
  return (
    <div 
      className='
        fixed 
        top-0 
        left-0 
        flex
        justify-enter
        items-center
        w-full 
        h-full 
        bg-modal-bg
      '
    >
      <div className='bg-white p-10' >

      </div>
      
    </div>
  )
}
 
export default Modal;