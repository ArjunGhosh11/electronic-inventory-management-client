import React from 'react';
import AllOrdersTable from './AllOrdersTable';

const AllOrders = () => {
    return (
        <div>
            <h1 className='font-bold text-xl text-primary'>ALL ORDERS</h1>
            <AllOrdersTable></AllOrdersTable>
        </div>
    );
};

export default AllOrders;