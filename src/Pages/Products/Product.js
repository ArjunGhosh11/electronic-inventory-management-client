import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './../Shared/Loading'
import Review from './Review';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useGetUserByEmail from '../../Hooks/useGetUserByEmail';
import useOrderCount from '../../Hooks/useOrderCount';
import { toast } from 'react-toastify';
const Product = () => {
    const { id } = useParams()
    const [error, setError] = useState(false);
    const [quantityUpdated, setQuantityUpdated] = useState(false);
    const [productSelected, setProductSelected] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [product, setProduct] = useState();
    const [productSpecs, setProductSpecs] = useState();
    const [userInfo] = useGetUserByEmail(user?.email);
    const [orderCount] = useOrderCount(userInfo?.user_id);
    useEffect(() => {
        axios.get(`http://localhost:8081/product/${id}`)
            .then(res => setProduct(res.data[0]))
            .catch(err => console.log(err));
        axios.get(`http://localhost:8081/product/specs/${id}`)
            .then(res => setProductSpecs(res.data))
            .catch(err => console.log(err));
    }, [id, quantityUpdated]);
    const [amount, setAmount] = useState(0)
    const [noOfItems, setNoOfItems] = useState(10)
    if (!product || !productSpecs || loading || !user) {
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
    const handleAddToCart = (user_id, quantity, noOfItems, orderCount, product_id, unit_price, setQuantityUpdated, setProductSelected) => {
        const cart_id = "CART-" + user_id.substring(5) + "-" + orderCount;
        const data = { cart_id: cart_id, quantity: noOfItems, product_id, unit_price }
        let error = false;
        axios.post("http://localhost:8081/productSelected", data)
            .then(res => {
                if (res.data.success) {
                    console.log(res)
                    setProductSelected(true)
                }
                else {
                    console.log(res);
                    error = false;
                    setError(true)
                }
            }
            )
            .catch(err => {
                console.log(err)
            });
        if (error) {
            sendToServer(product_id, quantity - noOfItems, setQuantityUpdated);

        }
    }
    const sendToServer = (id, quantity, setQuantityUpdated) => {
        const data = { id, quantity };
        axios.put(`http://localhost:8081/products/inventory/${id}`, data)
            .then(res => {
                if (res.data.success) {
                    setQuantityUpdated(true);
                    toast("Added to cart!!");
                }
                else {
                    console.log(res);
                }
            }).catch(err => console.log(err));
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
                    {(quantityUpdated & productSelected) || error ?
                        <h1 className='text-accent text-lg'>Items Added To Cart!</h1>
                        :
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
                            <button onClick={() => handleAddToCart(userInfo[0]?.user_id, product?.quantity, noOfItems, orderCount.orderCount, id, product?.unit_price, setQuantityUpdated, setProductSelected)} className='bg-slate-400 hover:bg-primary text-white  py-1 px-6 rounded  text-lg mt-5' >Add to cart</button>
                        </div>
                    }
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
            <Review id={id} user={user} loading={loading}></Review>
        </div>
    );
};

export default Product;