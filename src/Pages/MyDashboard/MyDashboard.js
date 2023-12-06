import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetUserById from '../../Hooks/useGetUserById';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrdersTable from './OrderTable';

const MyDashboard = () => {
    const { user_id } = useParams();
    const [user] = useGetUserById(user_id);
    const [updated, setUpdated] = useState(false);
    const [orders, setOrders] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [orderUpdated, setOrderUpdated] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8081/orders/' + user_id)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, [user_id, orderUpdated]);
    const onSubmit = data => {
        axios.put('http://localhost:8081/users/update/' + user_id, data)
            .then(res => {
                if (res.data.success) {
                    console.log(res);
                    setUpdated(true);
                    toast("User Updated!");
                }
                else {
                    console.log(res.data)
                }
            }).catch(err => console.log(err));
        reset();
    }
    return (
        <div>
            <h1 className='text-xl font-bold text-primary'>MY DASHBOARD</h1>

            <section className='my-10 lg:px-60 md:px-20 sm:px-20 flex justify-between shadow-2xl mx-5 py-5'>

                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>

                    <h1 className='text-xl font-bold text-accent'>Profile: {user?.email.toUpperCase()}</h1>
                    {updated ? <h1 className='text-xl font-bold text-secondary text-center my-10'>Profile Updated!!</h1> :
                        <div className='flex justify-between' >
                            <div className='w-full'>
                                <div className="form-control max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={user?.name}
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Name is Required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name?.message}</span>}
                                    </label>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder={user?.phone}
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: 'Phone Number is Required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone?.message}</span>}
                                    </label>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className="form-control w-full max-w-xs lg:ml-24">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={user?.address}
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("address", {
                                            required: {
                                                value: true,
                                                message: 'Address is Required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.address?.message}</span>}
                                    </label>
                                </div>

                                <input className='btn w-full max-w-xs  text-white mt-9 ' type="submit" value="UPDATE" />
                            </div>
                        </div>
                    }
                </form>
            </section>
            <section className='my-10 lg:px-30 md:px-20 sm:px-100 flex justify-center flex-col shadow-2xl mx-5 py-5'>
                <h1 className='text-xl font-bold text-primary'>MY ORDERS</h1>
                <OrdersTable orders={orders} orderUpdated={orderUpdated} setOrderUpdated={setOrderUpdated}></OrdersTable>
            </section>
        </div>
    );
};

export default MyDashboard;