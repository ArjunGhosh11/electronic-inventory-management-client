import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetUserById = (id) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8081/users/ID/${id}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err));

        }
    }, [id])
    return [user[0]]
};

export default useGetUserById;