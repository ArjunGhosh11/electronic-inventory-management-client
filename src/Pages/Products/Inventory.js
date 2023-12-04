import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';

const Inventory = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [productSpecs, setProductSpecs] = useState();
    const [noOfItems, setNoOfItems] = useState(10);
    const [quantityUpdated, setQuantityUpdated] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:8081/product/${id}`)
            .then(res => setProduct(res.data[0]))
            .catch(err => console.log(err));
        axios.get(`http://localhost:8081/product/specs/${id}`)
            .then(res => setProductSpecs(res.data))
            .catch(err => console.log(err));
    }, [quantityUpdated, id]);
    const handleAddItem = (noOfItems, setNoOfItems) => {
        const newNoOfItems = noOfItems + 10;
        setNoOfItems(newNoOfItems);
    }
    const handleReduceItem = (noOfItems, setNoOfItems, quantity) => {
        if (noOfItems > 10) {
            const newNoOfItems = noOfItems - 10;
            setNoOfItems(newNoOfItems);
        }
    }
    if (!product || !productSpecs) {
        return <Loading></Loading>
    }
    const sendToServer = (id, quantity, setQuantityUpdated) => {
        const data = { id, quantity }
        console.log(data)
        axios.put(`http://localhost:8081/products/inventory/${id}`, data)
            .then(res => {
                if (res.data.success) {
                    setQuantityUpdated(true);
                    toast("Quantity Updated!!");
                }
                else {
                    console.log(res);
                }
            }).catch(err => console.log(err));
    }
    const handleAddItemButton = (id, quantity, noOfItems, setQuantityUpdated) => {
        const newQuantity = quantity + noOfItems;
        sendToServer(id, newQuantity, setQuantityUpdated);
    }
    const handleReduceItemButton = (id, quantity, noOfItems, setQuantityUpdated) => {
        const newQuantity = quantity - noOfItems;
        sendToServer(id, newQuantity, setQuantityUpdated);
    }
    return (
        <div>
            <h1 className='font-bold text-secondary'>INVENTORY</h1>
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
                    {
                        quantityUpdated ? <h1 className='text-accent text-lg'>Quantity Updated!</h1>
                            :
                            <div className='text-right font-bold text-small'>
                                <h2 className='text-accent text-lg'>Number of items: </h2>
                                <h1><button onClick={() => handleAddItem(noOfItems, setNoOfItems)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                                    </svg>
                                </button>
                                </h1>
                                <h2 className='text-accent text-lg'>{noOfItems}</h2>
                                <h1>
                                    <button onClick={() => handleReduceItem(noOfItems, setNoOfItems)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                        </svg>

                                    </button>
                                </h1>
                                <div className='flex flex-col'>
                                    <button onClick={() => handleAddItemButton(id, product?.quantity, noOfItems, setQuantityUpdated)} className='bg-slate-400 hover:bg-primary text-white  py-1 px-6 rounded  text-lg mt-5' >Add Items</button>
                                    <button onClick={() => handleReduceItemButton(id, product?.quantity, noOfItems, setQuantityUpdated)} disabled={product?.quantity < noOfItems} className='bg-slate-400 hover:bg-primary text-white  py-1 px-6 rounded  text-lg mt-5' >Reduce Items</button>
                                </div>
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
            <section className='my-10 lg:px-60 md:px-20 sm:px-20  text-left shadow-2xl mx-5 py-5'>
                <h1 className='font-bold text-xl text-primary'>ADD SPECIFICATIONS</h1>
            </section>
        </div>
    );
};

export default Inventory;