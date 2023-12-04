import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './../Shared/Loading'
import Review from './Review';
const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const [productSpecs, setProductSpecs] = useState()
    useEffect(() => {
        axios.get(`http://localhost:8081/product/${id}`)
            .then(res => setProduct(res.data[0]))
            .catch(err => console.log(err));
        axios.get(`http://localhost:8081/product/specs/${id}`)
            .then(res => setProductSpecs(res.data))
            .catch(err => console.log(err));
    }, [id]);
    const [amount, setAmount] = useState(0)
    const [noOfItems, setNoOfItems] = useState(10)
    if (!product || !productSpecs) {
        return <Loading></Loading>
    }

    const handleAddItem = (noOfItems, setNoOfItems, quantity, unit_price) => {
        if (noOfItems < quantity) {
            const newNoOfItems = noOfItems + 10;
            setNoOfItems(newNoOfItems);
            setAmount(noOfItems * unit_price)
        }
    }
    const handleReduceItem = (noOfItems, setNoOfItems, unit_price) => {
        if (noOfItems > 10) {
            const newNoOfItems = noOfItems - 10;
            setNoOfItems(newNoOfItems);
            setAmount(noOfItems * unit_price)
        }
    }

    return (
        <div>
            <section className='my-10 lg:px-60 md:px-20 sm:px-20 flex justify-between shadow-2xl mx-5 py-5'>
                <div>
                    <div className='flex flex-col text-left'>
                        <h1 className='font-bold text-xl text-primary'>PRODUCT INFO</h1>
                        <h2 className='text-xl font-semibold'>Brand: {product.brand}</h2>
                        <h2 className='text-xl font-semibold'>Model: {product.model}</h2>
                        <h2 className='text-xl font-semibold'>Type: {product.type}</h2>
                        <h2 className='text-xl font-semibold'>Quantity: {product.quantity}</h2>
                        <h2 className='text-xl font-semibold'>Unit Price: ${product.unit_price}</h2>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-right font-bold text-small'>
                        <h2 className='text-accent text-lg'>Amount: </h2>
                        <h1><button onClick={() => handleAddItem(noOfItems, setNoOfItems, product?.quantity, product.unit_price)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                        </h1>
                        <h2 className='text-accent text-lg'>${product.unit_price} x {noOfItems} </h2>
                        <h1>
                            <button onClick={() => handleReduceItem(noOfItems, setNoOfItems, product.unit_price)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                </svg>

                            </button>
                        </h1>
                        <h2 className='text-accent text-lg'>= ${parseInt(product?.unit_price) * noOfItems}</h2>
                    </div>
                    <button className='bg-slate-400 hover:bg-primary text-white  py-1 px-6 rounded  text-lg mt-5' >Add to cart</button>
                </div>
            </section>
            <section className='my-10 lg:px-60 md:px-20 sm:px-20  text-left shadow-2xl mx-5 py-5'>
                <h1 className='font-bold text-xl text-primary'>PRODUCT SPECIFICATIONS</h1>
                {
                    productSpecs.map(productSpec =>
                        <h2 className='text-xl font-semibold'>{productSpec.specifications}</h2>
                    )
                }
            </section>
            <Review id={id}></Review>
        </div>
    );
};

export default Product;