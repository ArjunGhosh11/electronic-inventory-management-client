import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const Review = ({ id, user, loading }) => {
    const [reviews, setReviews] = useState([]);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [date, setDate] = useState(new Date());
    const [commentAdded, setCommentAdded] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:8081/reviews/' + id)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err));
    }, [id, commentAdded]);

    const onSubmit = data => {
        axios.post("http://localhost:8081/reviews", { date: date.toDateString(), product_id: id, name: user.displayName, comment: data.comment })
            .then(res => {
                if (res.data.success) {
                    setCommentAdded(commentAdded + 1);
                    toast('Comment added!');
                }
            }
            )
            .catch(err => {
                console.log(err)
            })
        reset();
    }
    if (!reviews || loading || !user) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <section className='my-10 lg:px-60 md:px-20 sm:px-20  text-left shadow-2xl mx-5 py-5'>
                <h1 className='font-bold text-xl text-primary'>ADD A REVIEW</h1>
                <div className='flex  items-center'>

                    <div className="w-96 bg-base-100">
                        <div className="card-body">

                            <form className='' onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Comment</span>
                                    </label>
                                    <input {...register("comment", {
                                        required: {
                                            value: true,
                                            message: 'Comment is Required'
                                        }
                                    })}
                                        type="text" placeholder="Your Comment"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                    <label className="label">
                                        {errors.comment?.type === 'required' && <span className="label-text-alt text-red-500">{errors.comment?.message}</span>}
                                    </label>
                                </div>

                                <button className="btn btn-outline btn-primary w-full max-w-xs">
                                    <input type="submit" className='' value='Post' />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className='my-10 lg:px-60 md:px-20 sm:px-20  text-left shadow-2xl mx-5 py-5'>
                <h1 className='font-bold text-xl text-primary'>Reviews</h1>
                {
                    reviews.map(review => <div className="chat chat-start mt-5">
                        <div className="chat-header">
                            {review.name}
                            <time className="text-xs opacity-50"></time>
                        </div>
                        <div className="chat-bubble text-sm">{review.comment}</div>
                        <div className="chat-footer opacity-50">
                            {review.date}
                        </div>
                    </div>)
                }
            </section>
        </div>
    );
};

export default Review;