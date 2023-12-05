import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutForm = ({ dateTime, amount, cart_id }) => {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const onSubmit = data => {
        const user_id = "user-" + cart_id.split('-')[1];
        const orderInfo = { cart_id, amount, dateTime, user_id, payment_status: 'unpaid', distributerName: data.distributerName, paymentMethod: data.paymentMethod }

        console.log(orderInfo);
        axios.post("http://localhost:8081/orders", orderInfo)
            .then(res => {
                if (res.data.success) {
                    setOrderPlaced(true);
                    toast("Order Placed!")
                    navigate("/")
                }
                else {
                    console.log(res)
                }
            }
            )
            .catch(err => {
                console.log(err)
            })
        reset();
    }
    if (amount === 0) {
        return <h1 className='font-bold text-xl text-accent text-center'>NO ITEMS ADDED TO CART!!</h1>
    }
    return (
        <div>
            <section className=' lg:px-60 md:px-20 sm:px-20  text-left shadow-2xl mx-5 py-5'>
                <div className='flex  items-center'>

                    <div className="w-full bg-base-100">
                        <div className="card-body">

                            <form className='min-w-full max-w-full' onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex justify-between items-center form-control'>
                                    <div className="form-control w-full max-w-xs ">
                                        <label className="label">
                                            <span className="label-text">Distributer Name</span>
                                        </label>
                                        <input {...register("distributerName", {
                                            required: {
                                                value: true,
                                                message: 'Distributer Name is Required'
                                            }
                                        })}
                                            type="text" placeholder="Distributer's Name"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                        <label className="label">
                                            {errors.distributerName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.distributerName?.message}</span>}
                                        </label>
                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Payment Method</span>
                                        </label>
                                        <select defaultValue='cash' className="select select-bordered"
                                            {...register("paymentMethod", {

                                            })}>
                                            <option value='cash'>Cash</option>
                                            <option value='card'>Card</option>
                                            <option value='mobile_banking'>Mobile Banking</option>
                                        </select>

                                    </div>

                                    <div className='form-control mt-5'>
                                        <button className="btn btn-outline btn-primary max-w-xs">
                                            <input type="submit" className='' value='Place Order' />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckoutForm;