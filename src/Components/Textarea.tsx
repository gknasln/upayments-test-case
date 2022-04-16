import React from 'react';   

 
export interface ITextAreaProps {
  value: any,
  onChange: Function,
  type?: string
  multiline?: boolean,
  placeholder?: string,
  className?: string,
  inputClass?: string,
  warn?: boolean,
  warning?: string
} 

const defaultProps: ITextAreaProps  = {
  value: "",
  onChange: () => {},
  type: "text",
}

const TextArea: React.FunctionComponent<ITextAreaProps> = props => {

  
  return (
    <label className={"block " + props.className} >
      <textarea
        {...props}
        onChange={e => props.onChange(e.target.value)}
        className={`
          placeholder:italic 
          placeholder:text-slate-400 
          block 
          bg-white 
          w-full 
          rounded-md 
          py-2 
          pl-4 
          pr-3 
          shadow-md 
          focus:outline-white 
          focus:border-whitesmoke-500 
          focus:ring-whitesmoke-500 
          focus:ring-1 
          sm:text-sm 
          h-20
          ${props.inputClass}  
        `}
      />
        {
          props.warn && (
            <span className='text-xs   text-red'>{props.warning}</span>
          )
        }
    </label>
  )
}

TextArea.defaultProps = defaultProps;
 
export default TextArea;