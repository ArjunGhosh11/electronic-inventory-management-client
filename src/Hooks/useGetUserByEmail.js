import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetUserByEmail = email => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (email) {
            axios.get(`http://localhost:8081/users/${email}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err));

        }
    }, [email])
    return [user]
};

export default useGetUserByEmail;