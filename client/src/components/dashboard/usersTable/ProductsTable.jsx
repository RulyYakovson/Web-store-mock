import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {connect} from "react-redux";
import {DeleteForever, Edit} from '@material-ui/icons';
import {addProduct, deleteProduct, fetchProducts, updateProduct} from "../../../actions/productsActions";
import ImageDialog from "../../ImageDialog";
import Title from "../Title";

const ProductsTable = ({products, dispatch, isLoading}) => {

    const [selectedRow, setSelectedRow] = useState(null);

    const priceCellView = rowData =>
        <h6 style={{textAlign: "center"}}>
            <span>{rowData.price}  &#8362;</span>
        </h6>;

    const imageCellView = rowData =>
        rowData && (
            <ImageDialog
                dispatch={dispatch}
                rowData={rowData}
                src={rowData && rowData.src}
                style={{width: 80, height: 80, borderRadius: '50%'}}
            />);

    const headerStyle = {textAlign: 'center', paddingLeft: '15px'};
    const cellStyle = {paddingLeft: '30px'};

    const columns = [
        {editable: 'never', render: imageCellView},
        {title: 'Name', field: 'name'},
        {title: 'Description', field: 'description'},
        {title: 'Price', field: 'price', render: priceCellView, headerStyle: headerStyle},
        {title: 'Amount', field: 'amount', cellStyle: cellStyle},
        {title: 'New product', field: 'isNewProduct', lookup: {true: 'True', false: 'False'}},
        {title: 'Sale', field: 'isSale', lookup: {true: 'True', false: 'False'}},
    ];

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div>
            <MaterialTable
                isLoading={isLoading}
                title={<Title>Recent Orders</Title>}
                columns={columns}
                data={products}
                localization={{header: {actions: ''}}}
                onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.id))}
                icons={{
                    Delete: () => <DeleteForever style={{color: "crimson", marginRight: '30px'}}/>,
                    Edit: () => <Edit style={{color: "darkslateblue"}}/>
                }}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.id) ? '#EEE' : '#FFF'
                    }),
                    headerStyle: {
                        backgroundColor: '#3f51b5',
                        color: '#FFF'
                    },
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                }}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            dispatch(addProduct(newData));
                            resolve();
                        }),
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            dispatch(updateProduct(newData));
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