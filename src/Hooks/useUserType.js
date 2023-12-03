import axios from "axios";
import { useEffect, useState } from "react";

const useUserType = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            axios.get(`http://localhost:8081/admin/${email}`)
                .then(res => {
                    setAdmin(res.data.type)
                    setAdminLoading(false)
                })
                .catch(err => console.log(err));

        }
    }, [user])
    return [admin, adminLoading]
};

export default useUserType;