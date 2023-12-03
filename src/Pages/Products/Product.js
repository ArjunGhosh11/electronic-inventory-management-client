import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './../Shared/Loading'
const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const [productSpecs, setProductSpecs] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8081/product/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
        axios.get(`http://localhost:8081/product/specs/${id}`)
            .then(res => setProductSpecs(res.data))
            .catch(err => console.log(err));
    }, [id]);
    console.log(product);
    console.log(productSpecs)
    if (!product || !productSpecs) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1>Product Description:{id}</h1>
        </div>
    );
};

export default Product;