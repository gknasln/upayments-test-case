import React from 'react';   

 
interface Option {
  label: string,
  value: any
}

export interface ISelectProps {
  value: any,
  onChange: Function,
  className?: string,
  inputClass?: string,
  placeholder?: string,
  options: Array<Option>
} 

const defaultProps: ISelectProps  = {
  value: "",
  onChange: () => {},
  options: [],
}

const Select: React.FunctionComponent<ISelectProps> = props => {
  return (
    <label className={"relative block " + props.className}>
      <select 
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
          shadow-md 
          focus:outline-none 
          focus:border-whitesmoke-500 
          focus:ring-whitesmoke-500 
          focus:ring-1 
          sm:text-sm ${props.inputClass}  
        `}
        >
          {
            props.placeholder && props.placeholder.length > 0 ? (
              <option value={"none"}>{props.placeholder}</option>
            ) : null
          }
          {
            props.options.map((option: Option) => (
              <option 
                key={"select-option-" + option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))
          }
      </select>  
    </label>
  )
}

Select.defaultProps = defaultProps;
 
export default Select;