import React, { useState } from 'react'
import "./ProductDetailScreen.css"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { iconColor } from '../../constants/IconSize';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';



const ProductDetailScreen = (props) => {
    const [product,setProduct] = useState(props.product) 
    const [productOrderCount, setProductOrderCount] = useState(0)
    const productList = props.productList
    const productIndex = productList.map(temp=>temp.id).indexOf(product.id)
    

    return (
    <div className='product_detail_screen'>
        <IoIosCloseCircleOutline size={"40px"} color='var(--primary-green)' cursor={"pointer"} onClick={props.onCloseClick}/>
        <img className='product_detail_screen-image' src={product? product.image: ""} alt={"Product image"}/>
        <div className='product_detail_screen-carousel'>
            <MdKeyboardArrowLeft 
                size={"40px"} 
                color='var(--primary-green)' 
                cursor={"pointer"} 
                onClick={()=>{
                    setProduct(productList[productIndex==0? productList.length-1:(productIndex-1)])
                }}
            />
            <h1 style={{textAlign:"center", userSelect:"none"}}>{product.name}</h1>
            <MdKeyboardArrowRight
                size={"40px"} 
                color='var(--primary-green)' 
                cursor={"pointer"} 
                onClick={()=>{
                    setProduct(productList[(productIndex+1)%productList.length])
                }}
            />
        </div>
        <div style={{display: "flex", justifyContent:"center", padding:"0 10%"}}>
            <p style={{textAlign: "center"}}>{product.description}</p>
        </div>
        <div style={{display: "flex", width:"100%"}}>
            <div className='product_detail_stat'>
                <div style={{fontStyle:"italic"}}>{product.quantity === 0? "Out of Stock":"In Stock" }</div>
                <div>P {product.price} / kg</div>
                <div><strong>Total: </strong> P {product.price * productOrderCount}</div>
            </div>
            <div className='product_detail_order'>
                <CiCircleMinus
                    size={"40px"} 
                    color='var(--primary-green)' 
                    cursor={"pointer"} 
                    onClick={()=>{
                        setProductOrderCount(productOrderCount=> productOrderCount===0 ? productOrderCount : productOrderCount-1)
                    }}
                />
                <div style={{padding:"1rem"}}>{productOrderCount}</div>
                    <CiCirclePlus
                        size={"40px"} 
                        color='var(--primary-green)' 
                        cursor={"pointer"} 
                        onClick={()=>{
                            setProductOrderCount(productOrderCount=>productOrderCount+1)
                        }}
                    />
                </div>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
            
            <button className='product_item-button' onClick={()=>{}} style={{width:"50%"}}>
                <PiShoppingCartSimpleLight color={iconColor} size={'3ch'}/>
                Add To Cart
            </button>
        </div>
    </div>
    )
}

export default ProductDetailScreen