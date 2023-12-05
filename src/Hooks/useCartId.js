import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useGetUserByEmail from './useGetUserByEmail';
import useOrderCount from './useOrderCount';

const useCartId = () => {
    const [user, loading] = useAuthState(auth);
    const [userInfo] = useGetUserByEmail(user?.email);
    const [orderCount] = useOrderCount(userInfo?.userId);
    const cart_id = "CART-" + userInfo[0]?.user_id.substring(5) + '-' + orderCount?.orderCount;
    if (userInfo[0]?.user_id.substring(5) & orderCount?.orderCount) {
        return cart_id
    }
};

export default useCartId;