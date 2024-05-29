import React from 'react';
import './Card.css';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';


const Card = ({ title, image, description, path }) => {
    const handleSelect = () => {
        console.log(`${title} selected`);
    };

    return (
        <div className="card">
            <div className="card-content">
                {image}  
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <Link to ={path}>
                <button className="select" onClick={handleSelect}>Select</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;