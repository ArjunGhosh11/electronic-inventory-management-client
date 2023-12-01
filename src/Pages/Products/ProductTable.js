import React from 'react';

const ProductTable = ({ products }) => {
    let i = 1;
    return (
        <div className='m-10'>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Product ID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product =>
                                <tr>
                                    <th>{i++}</th>
                                    <td>{product.product_id}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.model}</td>
                                    <td>{product.type}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.unit_price}</td>
                                    <td><button className='btn btn-outline btn-secondary p-2 py-2'>Edit</button></td>

                                </tr>
                            )
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Sl.No</th>
                            <th>Product ID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;