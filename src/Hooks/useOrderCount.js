import axios from "axios";
import { useEffect, useState } from "react";

const useOrderCount = (id) => {
    const [orderCount, setOrderCount] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/orderID/' + id)
            .then(res => setOrderCount(res.data))
            .catch(err => console.log(err));
    }, [id]);
    return orderCount;
};

export default useOrderCount;