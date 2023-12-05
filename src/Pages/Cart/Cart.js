import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutForm from './CheckoutForm';

const Cart = () => {
    const { cart_id } = useParams();
    console.log(cart_id);
    const currentDate = new Date();
    // Formatting the date to match SQL's DATETIME format (YYYY-MM-DD HH:MM:SS)
    const formattedDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const paymentStatus = 'unpaid';
    const [quantityUpdated, setQuantityUpdated] = useState(false);
    const [itemDeleted, setItemDeleted] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    let j = 1;
    useEffect(() => {
        axios.get('http://localhost:8081/productSelected/' + cart_id)
            .then(res => setCartItems(res.data))
            .catch(err => console.log(err));
    }, [cart_id, itemDeleted]);
    const getTotalAmount = (cartItems) => {
        let total = 0
        cartItems.map(cartItem => {
            total += cartItem.quantity * cartItem.unit_price;
        })
        return total;
    }

    const totalAmount = getTotalAmount(cartItems);
    console.log(totalAmount);
    const handleDeleteButton = (cart_id, product_id, quantity, setQuantityUpdated, setItemDeleted) => {
        axios.delete("http://localhost:8081/productSelected/", { data: { cart_id: cart_id, product_id: product_id } })
            .then(res => {
                setItemDeleted(itemDeleted + 1);
                console.log(res);
            });

        sendToServer(product_id, quantity, setQuantityUpdated);

    }

    const sendToServer = (id, quantity, setQuantityUpdated) => {
        const data = { id, quantity };
        axios.put(`http://localhost:8081/products/cart/${id}`, data)
            .then(res => {
                if (res.data.success) {
                    setQuantityUpdated(true);
                    toast("Item Deleted!");
                }
                else {
                    console.log(res);
                }
            }).catch(err => console.log(err));
    }
    return (
        <div>
            <h1>CART</h1>
            <div className='m-10'>
                <div className="overflow-x-auto">
                    <table className="table table-lg">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Product ID</th>
                                <th>Number of items</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map(cartItem =>
                                    <tr key={cartItem.product_id} >
                                        <th>{j++}</th>
                                        <td>{cartItem.product_id}</td>
                                        <td>{cartItem.quantity}</td>
                                        <td>${cartItem.unit_price}</td>
                                        <td>${cartItem.unit_price * cartItem.quantity}</td>
                                        <td>
                                            <button onClick={() => handleDeleteButton(cart_id, cartItem.product_id, cartItem.quantity, setQuantityUpdated, setItemDeleted)} className=''>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                </svg>

                                            </button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Sl.No</th>
                                <th>Product ID</th>
                                <th>Number of items</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <CheckoutForm amount={totalAmount} dateTime={formattedDateTime} cart_id={cart_id}></CheckoutForm>
        </div>
    );
};

export default Cart;