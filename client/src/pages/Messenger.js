import React from 'react'

const Messenger = () => {
  return (
    <div style={{display:"flex", justifyContent: "space-between", width:"100%"}}>
        <div style={{width: "5%", height: "100vh", backgroundColor: "red", display: "flex",flexDirection:"column", justifyContent: "space-between"}}>
            <div>
                <h1>HA</h1>
                <h1>HA</h1>
                <h1>HA</h1>
            </div>
            <h1>HA</h1>
        </div>
        <div style={{width: "38%",height: "100vh",  backgroundColor: "red"}}></div>
        <div style={{width: "38%",height: "100vh",  backgroundColor: "red"}}></div>
        <div style={{width: "10%",height: "100vh",  backgroundColor: "red"}}></div>
    </div>
  )
}

export default Messenger