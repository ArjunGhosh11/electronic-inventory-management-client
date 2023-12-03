import React from 'react';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useProductIdGenerator from '../../Hooks/useProductIdGenerator';
import { toast } from 'react-toastify';
const SignUp = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [id] = useProductIdGenerator();
    if (!id) {
        return <Loading></Loading>
    }

    const onSubmit = data => {
        console.log(data)
        axios.post("http://localhost:8081/products", data)
            .then(res => {
                if (res.data.success) {
                    toast("Product is added.")
                }
            }
            )
            .catch(err => {
                toast.error("Please Retry!")
            })
        axios.put('http://localhost:8081/idProducer/product', data)
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err));
        reset()
    }
    setValue("id", `P-${id + 1}`);
    setValue("id_no", id + 1);
    console.log(id);
    return (
        <div className='flex h-screen justify-center items-center '>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">ADD A PRODUCT</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Brand</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Product Brand"
                                className="input input-bordered w-full max-w-xs"
                                {...register("brand", {
                                    required: {
                                        value: true,
                                        message: 'Brand is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.brand?.type === 'required' && <span className="label-text-alt text-red-500">{errors.brand?.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Model</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Product Model"
                                className="input input-bordered w-full max-w-xs"
                                {...register("model", {
                                    required: {
                                        value: true,
                                        message: 'Model is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.model?.type === 'required' && <span className="label-text-alt text-red-500">{errors.model?.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Product Quantity"
                                className="input input-bordered w-full max-w-xs"
                                {...register("quantity", {
                                    required: {
                                        value: /\d{2,}|\d{3,}|\d{4,}|\d{5,}|\d{6,}/,
                                        message: 'Valid Quantity is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.quantity?.message}</span>}
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Unit Price</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Unit Price"
                                className="input input-bordered w-full max-w-xs"
                                {...register("unit_price", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /\d{2,}|\d{3,}/,
                                        message: 'Provide a valid Unit Price'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.unit_price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.unit_price?.message}</span>}
                                {errors.unit_price?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.unit_price?.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Product Type</span>
                            </label>
                            <select defaultValue='laptop' className="select select-bordered"
                                {...register("type", {
                                    required: {
                                        value: true,
                                        message: 'Type is Required'
                                    }
                                })}>
                                <option value='laptop'>Laptop</option>
                                <option value='phone'>Phone</option>
                                <option value='cpu'>CPU</option>
                                <option value='gpu'>GPU</option>
                                <option value='charging_device'>Charging Device</option>
                                <option value='headset'>Head Set</option>
                                <option value='speaker'>Speaker</option>
                                <option value='earphone'>Earphones</option>
                                <option value='keyboard'>Key Board</option>
                                <option value='monitor'>Monitor</option>
                                <option value='mouse'>Mouse</option>
                            </select>
                            <label className="label">
                                {errors.type?.type === 'required' && <span className="label-text-alt text-red-500">{errors.type?.message}</span>}
                            </label>
                        </div>
                        <input className='btn w-full max-w-xs text-white' type="submit" value="SUBMIT" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default SignUp;