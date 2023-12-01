import React from 'react';
import { useForm } from "react-hook-form";
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [user1] = useAuthState(auth);
    const navigate = useNavigate()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    if (user1) {
        navigate("/products");
    }
    let signInError;
    if (error) {
        signInError = <p className='text-red-500'><small>{error?.message}</small></p>
    }
    if (loading) {
        return <Loading></Loading>
    }


    const onSubmit = (data) => {
        console.log(data);

        signInWithEmailAndPassword(data.email, data.password);

    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>

                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body ">
                        <h2 className="text-primary text-center text-3xl font-bold">Sign In</h2>

                        <form className='' onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                                    type="email" placeholder="Your Email"
                                    className="input input-bordered w-full max-w-xs"
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs mb-5">
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
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            <small className=' text-left'>{signInError}</small>
                            <button className="btn btn-outline btn-primary w-full max-w-xs">

                                <input type="submit" className='' value='SIGN IN' />
                            </button>

                        </form>
                        <small className='text-sm font-semibold'>New to TechDown?  <span className='text-primary ml-2'><Link to='/signup'>Sign Up</Link></span></small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;