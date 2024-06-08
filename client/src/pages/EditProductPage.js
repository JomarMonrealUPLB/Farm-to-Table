import React, { useEffect, useState } from 'react';

import {products} from '../assets/dummy_data/products'
import ProductDisplay from '../components/ProductDisplay'

import '../components/AddProduct.css';
import { useParams } from 'react-router-dom';

const EditProductPage = () => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const {id} = useParams();
    const dummyProducts = products;

    const [name, setName] = useState('Product Name');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('The description of the product.');
    const [type, setType] = useState('1');
    const [price, setPrice] = useState('-');
    const [quantity, setQuantity] = useState('0');
    const [existingProducts, setExistingProducts] = useState([])

    const handleEditProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            name: name,
            image: image,
            description: description,
            type: type,
            price: price,
            quantity: quantity
          };
        
        //add new product to database
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`,
        {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
        })
        .then(response => {
        response.text()
        alert("Product updated successfully!");
        window.location.href = "http://localhost:3001/product-listings"
        })

        //reset form 
        setName('Product Name');
        setImage('');
        setDescription('The description of the product.');
        setType('1');
        setPrice('-');
        setQuantity('0');      
        
        
    
      }
    
    useEffect(() => {

        fetch(process.env.REACT_APP_API_URL+ "/products")
          .then((response) => response.json())
          .then((data) => {
            setExistingProducts(data)
          })
          .catch((error) => console.error("Error fetching products:", error));

        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
        .then(response => response.json())
        .then(body => {
            setCurrentProduct(body);
        })
    }, []);

    useEffect(() => {
        if(currentProduct){

            setName(currentProduct.name);
            setImage(currentProduct.image);
            setDescription(currentProduct.description);
            setType(currentProduct.type);
            setPrice(currentProduct.price);
            setQuantity(currentProduct.quantity);  
        }
    }, [currentProduct]);

    
    return (
        <div className='add_product page'>
            <div className='add_product-container'>
                <div className='add_product-display'>
                    <ProductDisplay name={name} image={image} description={description} type={type} price={price} quantity={quantity} />
                </div>

                <div className='add_product-main'>
                    <h1>Edit Product</h1>
                    <form className='add_product-form' onSubmit={handleEditProduct}>
                        <div>
                            <label>Name </label>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Image </label>
                            <input type="text" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} required />
                        </div>
                        <div>
                            <label>Description </label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <div className='add_product-form-int'>
                            <div>
                                <label>Type </label>
                                <input type="number" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} min="1" max="4" required />
                            </div>
                            <div>
                                <label>Price </label>
                                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} min="0" required />
                            </div>
                            <div>
                                <label>Quantity </label>
                                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="0" required />
                            </div>

                        </div>
                    <button type="submit">Update Product</button>

                    </form>
                    
                </div>

            </div>
            

        </div>
    )

  


}

export default EditProductPage

