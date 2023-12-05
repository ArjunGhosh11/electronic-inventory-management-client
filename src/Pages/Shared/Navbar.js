import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import useUserType from '../../Hooks/useUserType';
import useGetUserByEmail from '../../Hooks/useGetUserByEmail';
import useOrderCount from '../../Hooks/useOrderCount';
const Navbar = () => {
    const [user] = useAuthState(auth);
    const [userType, userTypeLoading] = useUserType(user);
    const [userInfo] = useGetUserByEmail(user?.email);
    const [orderCount] = useOrderCount(userInfo?.userId);
    const cart_id = "CART-" + userInfo[0]?.user_id.substring(5) + '-' + orderCount?.orderCount;
    const logout = () => {
        signOut(auth);
    };
    // if (userTypeLoading) {
    //     return <p>Loading</p>
    // }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    {
                        !user ? <p></p>
                            :
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                <li><Link to='/products' >Products</Link></li>
                                {
                                    userType === 'admin' ?
                                        <div>
                                            <li><Link to='/addProduct' >Add Product</Link></li>
                                            <li><Link to='/adminDashboard' >Admin Dashboard</Link></li>
                                        </div>
                                        :
                                        <li><Link to='/myDashboard' >My Dashboard</Link></li>
                                }
                                {/* <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li> */}
                            </ul>
                    }
                </div>
                <Link to='/' className="btn btn-ghost text-xl">TechDown</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                {
                    !user ? <p></p>
                        :
                        <ul className="menu menu-horizontal px-1">
                            <li><Link to='/products' >Products</Link></li>
                            {
                                userType === 'admin' ?
                                    <div className='flex'>
                                        <li><Link to='/addProduct' >Add Product</Link></li>
                                        <li><Link to='/adminDashboard' >Admin Dashboard</Link></li>
                                    </div>
                                    :
                                    <li><Link to='/myDashboard' >My Dashboard</Link></li>
                            }
                            {/* <li tabIndex={0}>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li> */}
                        </ul>
                }
            </div>
            <div className="navbar-end">
                {user ? <div className='flex align-middle justify-center items-center'>
                    {
                        userType === 'client' ?
                            <Link to={"/myCart/" + cart_id}><button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                </svg>

                            </button></Link> :
                            <p></p>
                    }
                    <button className="btn btn-ghost" onClick={logout} >Sign Out</button>
                </div> : <small className='text-sm font-semibold text-primary'>Hello!</small>}
            </div>
        </div>
    );
};

export default Navbar;