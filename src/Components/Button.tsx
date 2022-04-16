import React from 'react';   

 
export interface IButtonProps {
  title: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  className?: string
} 

const Button: React.FunctionComponent<IButtonProps> = props => {
  return (
    <button 
      onClick={props.onClick}
      className={`
        bg-white 
        w-full 
        h-10
        rounded-md 
        shadow-md 
        focus:outline-white 
        hover:bg-white-hover
        sm:text-sm 
        font-medium
        ${props.className}  
      
      `}
    >
      {props.title}
    </button>
  )
}
 
export default Button;