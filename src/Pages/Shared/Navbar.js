import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import useUserType from '../../Hooks/useUserType';
const Navbar = () => {
    const [user] = useAuthState(auth);
    const [userType, userTypeLoading] = useUserType(user);
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
                {user ? <button className="btn btn-ghost" onClick={logout} >Sign Out</button> : <small className='text-sm font-semibold text-primary'>Hello!</small>}
            </div>
        </div>
    );
};

export default Navbar;