import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserTable = () => {
    let l = 1
    const [users, setUsers] = useState([]);
    const [userUpdated, setUserUpdated] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8081/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, [userUpdated]);
    const handleMakeAdminButton = (user_id, userUpdated, setUserUpdated) => {
        axios.put('http://localhost:8081/users/make-admin/' + user_id)
            .then(res => {
                if (res.data.success) {
                    setUserUpdated(userUpdated + 1);
                    toast("Employee is made admin!");
                }
                else {
                    console.log(res.data)
                }
            }).catch(err => console.log(err));
    }
    return (
        <div className='m-5'>
            <div className="overflow-x-auto">
                <table className="table table-lg">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                <tr key={user?.user_id}>
                                    <th>{l++}</th>
                                    <td>{user?.user_id}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.address}</td>
                                    <td>{user?.phone}</td>
                                    <td>{user?.role.toUpperCase()}</td>
                                    <td>
                                        {
                                            (user?.role === 'admin') ?
                                                <p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                                                    </svg>


                                                </p>
                                                :
                                                (user?.role === 'client') ?
                                                    <p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                                            <path fill-rule="evenodd" d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z" clip-rule="evenodd" />
                                                        </svg>

                                                    </p>
                                                    :
                                                    <div className='flex items-center justify-center'>
                                                        <button onClick={() => handleMakeAdminButton(user?.user_id, userUpdated, setUserUpdated)} className='btn btn-sm btn-outline btn-success px-4 mr-4'>Make Admin</button>
                                                    </div>

                                        }
                                    </td>

                                </tr>
                            )
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Sl.No</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default UserTable;