import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
const getFormattedDate = (datetimeString) => {
    const date = new Date(datetimeString); // Parse the datetime string
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
}
const handlePayButton = (cart_id, orderUpdated, setOrderUpdated) => {
    axios.put('http://localhost:8081/orders/make-payment/' + cart_id)
        .then(res => {
            if (res.data.success) {
                console.log(res);
                setOrderUpdated(orderUpdated + 1);
                toast("Payment Done!");
            }
            else {
                console.log(res.data)
            }
        }).catch(err => console.log(err));
}
// const handleDeleteButton = (cart_id, orderUpdated, setOrderUpdated) => {
//     axios.delete("http://localhost:8081/orders/delete/" + cart_id)
//         .then(res => {
//             setOrderUpdated(orderUpdated + 1)
//             console.log(res);
//             toast('Order Cancelled!');
//         });
// }
const OrdersTable = ({ orders, orderUpdated, setOrderUpdated }) => {
    let k = 0
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-lg">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Order ID</th>
                            <th>Distributer Name</th>
                            <th>Total Amount</th>
                            <th>Date And Time</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order =>
                                <tr key={order.cart_id}>
                                    <th>{k++}</th>
                                    <td>{order?.cart_id}</td>
                                    <td>{order?.distributer_name}</td>
                                    <td>{order?.total_amount}</td>
                                    <td>{getFormattedDate(order?.date)}</td>
                                    <td>{order?.payment_method.toUpperCase()}</td>
                                    <td>{order?.payment_status.toUpperCase()}</td>
                                    <td>
                                        {
                                            (order.payment_status === 'paid') ?
                                                <p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                                    </svg>
                                                </p>
                                                :
                                                <div className='flex items-center justify-center'>
                                                    <button onClick={() => handlePayButton(order?.cart_id, orderUpdated, setOrderUpdated)} className='btn btn-sm btn-outline btn-success px-4 mr-4'>Pay</button>
                                                    {/* <button onClick={() => handleDeleteButton(order?.cart_id, orderUpdated, setOrderUpdated)} className='btn btn-sm btn-error btn-outline'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>

                                                    </button> */}
                                                </div>

                                        }
                                    </td>

                                </tr>
                            )
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Sl.No</th>
                            <th>Order ID</th>
                            <th>Distributer Name</th>
                            <th>Total Amount</th>
                            <th>Date And Time</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;