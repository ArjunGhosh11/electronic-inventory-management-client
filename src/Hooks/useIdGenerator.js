
import axios from "axios";
import { useEffect, useState } from "react";

const useIdGenerator = () => {
    const [idInfo, setIdInfo] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/idProducer')
            .then(res => setIdInfo(res.data))
            .catch(err => console.log(err));
    }, []);
    return [idInfo[1]?.no_of_items];
}

export default useIdGenerator;