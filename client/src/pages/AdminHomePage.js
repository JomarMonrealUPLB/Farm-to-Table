import React from 'react'
import Header from '../components/Header'

const AdminHomePage = () => {
  return (
    <div className='admin_homepage page'>
      <Header headerTitle={"Admin Homepage"}/>
      <div>
        <Card title="Food" imageUrl="https://th.bing.com/th/id/OIP.c8TLoLaBCRwtJV6wwwxJkwAAAA?rs=1&pid=ImgDetMain"/>
        <Card  title="Clothes"  imageUrl="https://th.bing.com/th/id/OIP.c8TLoLaBCRwtJV6wwwxJkwAAAA?rs=1&pid=ImgDetMain"/>
        <Card  title="Food"  imageUrl="https://th.bing.com/th/id/OIP.c8TLoLaBCRwtJV6wwwxJkwAAAA?rs=1&pid=ImgDetMain"/>
      </div>
    </div>
  )

}

export default AdminHomePage


function Card(props) {
  return <div className='card' style={{ width: "20%", height: "400px", backgroundColor: "var(--primary-green)" }}>
    
    <h2>{props.title}</h2>
    
    <div>
      <img src={props.imageUrl}/>
    </div>
  </div>
}