import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AllOrdersTable = () => {
    let m = 1;
    const [orders, setOrders] = useState([]);
    const [orderUpdated, setOrderUpdated] = useState(0);
    const getFormattedDate = (datetimeString) => {
        const date = new Date(datetimeString); // Parse the datetime string
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return formattedDate;
    }
    useEffect(() => {
        axios.get('http://localhost:8081/orders/')
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, [orderUpdated]);
    const handleDeliverButton = (cart_id, orderUpdated, setOrderUpdated) => {
        axios.put('http://localhost:8081/orders/deliver/' + cart_id)
            .then(res => {
                if (res.data.success) {
                    setOrderUpdated(orderUpdated + 1);
                    toast("Order Dispatched!");
                }
                else {
                    console.log(res.data)
                }
            }).catch(err => console.log(err));
    }
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
                                <tr key={order?.cart_id}>
                                    <th>{m++}</th>
                                    <td>{order?.cart_id}</td>
                                    <td>{order?.distributer_name}</td>
                                    <td>{order?.total_amount}</td>
                                    <td>{getFormattedDate(order?.date)}</td>
                                    <td>{order?.payment_method.toUpperCase()}</td>
                                    <td>{order?.payment_status.toUpperCase()}</td>
                                    <td>
                                        {
                                            (order.payment_status === 'approved') ?
                                                <p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                                        <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                                                        <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                                    </svg>

                                                </p>
                                                :
                                                (order?.payment_status === 'approved') ?
                                                    <p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                                            <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                                                            <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                                        </svg>
                                                    </p>

                                                    :
                                                    order?.payment_status === 'unpaid' ?
                                                        <p>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
                                                            </svg>

                                                        </p> :
                                                        <div className='flex items-center justify-center'>
                                                            <button onClick={() => handleDeliverButton(order?.cart_id, orderUpdated, setOrderUpdated)} className='btn btn-sm btn-outline btn-success px-4 pr-3'>Deliver</button>
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

export default AllOrdersTable;