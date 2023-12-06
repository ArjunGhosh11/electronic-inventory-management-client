import React, { useEffect, useState } from 'react';
import ProductTable from './ProductTable';
import axios from 'axios';
import Loading from '../Shared/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useGetUserByEmail from '../../Hooks/useGetUserByEmail';

const Products = () => {
    const [user, loading] = useAuthState(auth);
    const [userInfo] = useGetUserByEmail(user?.email);
    const userType = userInfo[0]?.role;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    // if (!products || loading || !userType) {
    //     return <Loading></Loading>
    // }
    return (
        <div className='flex flex-col justify-center  item-center'>
            <div className='flex justify-center items-center px-20 w-screen'>
                <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
                <button className="btn btn-wide">
                    <input type="submit" className='' value='Search' />
                </button>
            </div>
            <ProductTable userType={userType} products={products}></ProductTable>
        </div>
    );
};

export default Products;