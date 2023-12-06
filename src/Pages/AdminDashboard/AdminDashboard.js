import React from 'react';
import UserTable from './UserTable';

const AdminDashboard = () => {
    return (
        <div>
            <h1 className='font-bold text-xl text-primary'>ADMIN DASHBOARD</h1>
            <UserTable></UserTable>
        </div>
    );
};

export default AdminDashboard;