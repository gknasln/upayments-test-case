import React from 'react';   

 
export interface InputProps {
  value: any,
  onChange: Function,
  type?: string
  placeholder?: string,
  className?: string,
  inputClass?: string,
  warn?: boolean,
  warning?: string
} 

const defaultProps: InputProps  = {
  value: "",
  onChange: () => {},
  type: "text",
  warn: false
}



const Input: React.FunctionComponent<InputProps> = props => {
  return (
    <label className={"relative block " + props.className}>
      {/* <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
      </span> */}
      <input 
        {...props}
        onChange={e => props.onChange(e.target.value)}
        className={`
          placeholder:italic 
          placeholder:text-slate-400 
          block 
          bg-white 
          w-full 
          h-11
          rounded-md 
          py-2 
          pl-4 
          pr-3 
          mb-0
          shadow-md 
          focus:outline-white 
          focus:border-lightgray-100
          focus:ring-whitesmoke-500 
          focus:ring-1 
          sm:text-sm ${props.inputClass}  
        `}
        />
        {
          props.warn ? (
            <span className='text-xs   text-red'>{props.warning}</span>
          ) : null
        }
    </label>  
  )
}

Input.defaultProps = defaultProps;
 
export default Input;