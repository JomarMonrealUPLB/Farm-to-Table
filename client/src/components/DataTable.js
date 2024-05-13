import React from 'react'
import "./DataTable.css"

const DataTable = (props) => {
    const data = props.data
    const heads = props.heads
    return (
    <table className='data_table' cellSpacing={0}>
            <tbody>
                <tr>
                    {heads.map((head,index) => {
                        return <th key={index} style={{width: head.width? head.width:"auto", textAlign: head.align? head.align:"left"}}>{head.label}</th>
                    })}
                </tr>

                {data.map((infos,index)=> {
                    return (
                        <tr key={index}>
                            {Object.keys(infos).map((infoKey,j)=>
                                {
                                    return evaluateInfo(infos, infoKey, j)
                                }
                            )}
                        </tr>
                    )
                })}

            </tbody>

    </table>
  )
}

const evaluateInfo = (infos, key, index) => {
    if(key === "actions"){
        return (
            <td key={index} style={{textAlign: "center"}}>{
                infos[key].map(action =>
                    <button 
                        onClick={action.callback} 
                        style={{margin: "2px", ...action.buttonStyle}}
                        onMouseEnter={(e)=> e.currentTarget.style.backgroundColor = action.buttonStyle.hoverColor}
                        onMouseLeave={(e)=> e.currentTarget.style.backgroundColor = action.buttonStyle.backgroundColor}
                    >
                        {action.label}
                    </button>
                )
            }</td>
        )
    }

    return (<td key={index}>{infos[key]}</td>)
}

export default DataTable