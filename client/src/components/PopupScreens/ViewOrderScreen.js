import React, { useState } from 'react'
import "./ProductDetailScreen.css"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { iconColor } from '../../constants/IconSize';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { ProductType } from '../../constants/ProductType';



const ViewOrderScreen = (props) => {
    const [product,setProduct] = useState(props.product) 
    const [productOrderCount, setProductOrderCount] = useState(0)
    const productList = props.productList
    

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
                
                <span style={{padding:"0"}}><strong>Product Type: </strong>{ProductType.toString(product.type)}</span>
                <div style={{fontStyle:"italic"}}>{product.quantity === 0? "Out of Stock":"In Stock" }</div>
                <div>P {product.price} / kg</div>
                <span style={{padding:"0"}}><strong>Product quantity: </strong>{props.quantity} kg</span>
            </div>
            <div className='product_detail_order' style={{flexDirection:"column",justifyContent:"start"}}>
                
                <div style={{fontSize:"20px"}}><strong>Total: </strong> P {product.price * props.quantity}</div>
                   
            </div>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
            

        </div>
    </div>
    )
}

export default ViewOrderScreen