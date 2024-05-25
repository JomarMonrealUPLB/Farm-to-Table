import React, { useState } from 'react'
import "./ProductDetailScreen.css"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ProductType } from '../../constants/ProductType';



const ViewProductScreen = (props) => {
    const [product,setProduct] = useState(props.product) 
    const [productOrderCount, setProductOrderCount] = useState(0)

    return (
    <div className='product_detail_screen'>
        <IoIosCloseCircleOutline size={"40px"} color='var(--primary-green)' cursor={"pointer"} onClick={props.onCloseClick}/>
        <img className='product_detail_screen-image' src={product? product.image: ""} alt={"Product image"}/>
        <div className='product_detail_screen-carousel' style={{justifyContent:"center"}}>
            <h1 style={{textAlign:"center", userSelect:"none"}}>{product.name}</h1>
        </div>
        <div style={{display: "flex", justifyContent:"center", padding:"0 10%"}}>
            <p style={{textAlign: "center"}}>{product.description}</p>
        </div>
        <div style={{display: "flex", width:"100%"}}>
            <div className='product_detail_stat'>
                <div style={{fontStyle:"italic"}}>{product.quantity === 0? "Out of Stock":"In Stock" }</div>
                <div>P {product.price} / kg</div>
            </div>
            <div className='product_detail_order'>
                <strong>Product Type:</strong>
                <div style={{padding:"1rem"}}>{ProductType.toString(product.type)}</div>
            </div>
        </div>
    </div>
    )
}

export default ViewProductScreen