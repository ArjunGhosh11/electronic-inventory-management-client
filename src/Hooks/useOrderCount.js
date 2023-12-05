import axios from "axios";
import { useEffect, useState } from "react";

const useOrderCount = (id) => {
    const [orderCount, setOrderCount] = useState([]);
    console.log("ID in useOrderCount-", id)
    useEffect(() => {
        axios.get('http://localhost:8081/orderID/' + id)
            .then(res => setOrderCount(res.data))
            .catch(err => console.log(err));
    }, [id]);
    console.log("orderCount-", orderCount?.orderCount)
    return orderCount;
};

export default useOrderCount;