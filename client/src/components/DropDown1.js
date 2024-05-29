import React from 'react'
import "./DropDown1.css"

const DropDown1 = ({name,options,onChange}) => {
  return (
    <select className='drop_down_1' id={name} name={name} onChange={onChange}>
        {
            options.map(option =>
                <option key={option.name} value={option.value} name={option.name}> {option.name} </option>
            )
        }
    </select>	
  ) 
}

export default DropDown1