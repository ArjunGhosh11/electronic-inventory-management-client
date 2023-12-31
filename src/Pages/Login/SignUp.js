import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
    const [id, setId] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/idProducer')
            .then(res => setId(res.data[1].no_of_items))
            .catch(err => console.log(err));
    }, []);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    // if (!id) {
    //     return <Loading></Loading>
    // }
    if (user) {
        navigate("/products");
    }
    let signInError;
    if (error || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || updateError?.message}</small></p>
    }
    // if (loading || updating) {
    //     return <Loading></Loading>
    // }

    console.log(id);
    const onSubmit = async data => {
        // setValue("id", `user-${id + 1}`);
        // setValue("id_no", id + 1);
        const user_id = "user-" + id
        const id_no = id + 1
        const userInfo = { address: data.address, email: data.email, name: data.name, password: data.password, phone: data.phone, role: data.role, id: user_id }
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log(data)
        axios.post("http://localhost:8081/users", userInfo)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        axios.put('http://localhost:8081/idProducer/user', { id_no: id_no })
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err));
    }
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
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
                                placeholder="Your Phone Number"
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
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Address"
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

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email?.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="current-password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password?.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password?.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select defaultValue='client' className="select select-bordered"
                                {...register("role", {

                                })}>
                                <option value='client'>Client</option>
                                <option value='employee'>Employee</option>
                            </select>
                            <label className="label">
                                {errors.role?.type === 'required' && <span className="label-text-alt text-red-500">{errors.role?.message}</span>}
                            </label>
                        </div>


                        {signInError}
                        <input className='btn w-full max-w-xs text-white' type="submit" value="REGISTER" />
                    </form>
                    <small className='text-sm font-semibold'>Already have an account?  <span className='text-primary ml-2'><Link to='/login'>Sign In</Link></span></small>
                </div>
            </div>
        </div >
    );
};

export default SignUp;