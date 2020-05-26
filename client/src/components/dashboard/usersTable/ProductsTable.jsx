import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {deleteProduct, fetchProducts} from "../../../actions/productsActions";

const ProductsTable = ({products, dispatch, isLoading}) => {

    const priceCellView = rowData =>
        <h4 style={{textAlign: "center"}}>
            <span>{rowData.price}  &#8362;</span>
        </h4>;

    const imageCellView = rowData =>
        <img src={`data:image/png;base64, ${rowData.src}`}
             style={{width: 80, height: 80, borderRadius: '50%'}}/>;

    const columns = [
        {title: 'Name', field: 'name'},
        {title: 'Description', field: 'description'},
        {
            title: 'Price',
            field: 'price',
            render: priceCellView,
            headerStyle: {
                textAlign:'center'
            }
        },
        {title: 'Amount', field: 'amount'},
        {
            title: 'Image',
            field: 'src',
            render: imageCellView
        },
    ];

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div>
            <MaterialTable
                isLoading={isLoading}
                title='Products details'
                columns={columns}
                data={products}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            // dispatch(addEmployee(newData));
                            resolve();
                        }),
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            //dispatch(updateEmployee(newData));
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            dispatch(deleteProduct(oldData.name));
                            resolve();
                        }),
                }}
            />
        </div>
    );
};

export default connect(store => ({
    products: store.products && store.products.products,
    isLoading: store.products.isLoading
}))(ProductsTable);