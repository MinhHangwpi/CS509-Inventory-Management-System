import CustomAppBar from "../components/AppBar";
import Footer from "../components/Footer";
import * as React from 'react';

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";
import { useParams } from 'react-router-dom';

// returnedStock = {
//     "shelfStock": [{ "SKU": "DRJ297831", "name": "Soap", "description": "Liquid Soap", "price": 1.99, "maxQuantity": 40, "quantity": 20, "aisle": 1, "shelf": 2 }, { "SKU": "JK199283", "name": "Dove's Extra Care", "description": "Shampoo", "price": 4.99, "maxQuantity": 5, "quantity": 2, "aisle": 1, "shelf": 2 }],
//     "overStock": [{ "SKU": "DRJ297831", "name": "Soap", "description": "Liquid Soap", "price": 1.99, "maxQuantity": 40, "quantity": 10 }]
// };

var base_url = "https://3fckw1ryka.execute-api.us-east-1.amazonaws.com/Prod/";
var generate_inventory_report_url = base_url + "inventoryReportGenerator";



const columns_shelf = [
    {
        field: "SKU",
        headerName: "SKU",
        type: "number",
        width: 120
    },
    {
        field: "name",
        headerName: "Item",
        width: 90
    },
    {
        field: "description",
        headerName: "Description",
        width: 120
    },
    {
        field: "price",
        headerName: "Price",
        type: "number",
        width: 110
    },
    {
        field: "maxQuantity",
        headerName: "Max Shelf Quantity",
        type: "number",
        width: 200
    },
    {
        field: "aisle",
        headerName: "Aisle",
        width: 110
    },
    {
        field: "shelf",
        headerName: "Shelf",
        width: 110
    },
    {
        field: "quantity",
        headerName: "Actual Quantity",
        width: 110
    },
];

const columns_overstock = [
    {
        field: "SKU",
        headerName: "SKU",
        type: "number",
        width: 120
    },
    {
        field: "name",
        headerName: "Item",
        width: 90
    },
    {
        field: "description",
        headerName: "Description",
        width: 120
    },
    {
        field: "price",
        headerName: "Price",
        type: "number",
        width: 110
    },
    {
        field: "maxQuantity",
        headerName: "Max Shelf Quantity",
        type: "number",
        width: 200
    },
    {
        field: "quantity",
        headerName: "Actual Quantity",
        width: 200
    }
];

const rows = [];

function* generateRowId() {
    let id = 0;
    while (true) {
        yield id++;
    }
}


export default function ManagerInventory() {
    //row id generator helper for constructing data grid
    const rowIdGenerator_shelf = generateRowId();
    const rowIdGenerator_overstock = generateRowId();

    //set states for shelfStock and overStock
    const [shelfStockRows, setShelfStockRows] = React.useState([]);
    const [overStockRows, setOverStockRows] = React.useState([]);

    const storeId = useParams().storeId;
    let data = {};
    data['storeID'] = storeId;
    
    // //building up the payload; ffirst starting from data, then build a body
    let body = {};
    body['body'] = JSON.stringify(data);

    console.log(body);

    let js = JSON.stringify(body);

    React.useEffect(() => {
        fetch(generate_inventory_report_url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: js
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("success: ", data);
                alert(data.result);
                //set new rows as the rows of items fetched from the server
                let newShelfStockRows = data.stock.shelfStock;
                setShelfStockRows(newShelfStockRows);

                let newOverStockRows = data.stock.overStock;
                setOverStockRows(newOverStockRows);
            })
            .catch((error) => {
                console.log('Error: ', error);
                alert(error);
            })
    }, [])


    return (
        <div>
            <CustomAppBar />
            <div>
                {/* View store #3 for example */}
                <Typography variant="h5" align="center"> Shelf Stock Items in Store {storeId} </Typography>
                {/* TODO: To show data in tbular format instead of a JSON, need quality selection + buy functionality*/}
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        getRowId={() => rowIdGenerator_shelf.next().value}
                        rows={shelfStockRows} // to change to shelfStockRows
                        columns={columns_shelf}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </Box>
            </div>

            <div>
                {/* View store #3 for example */}
                <Typography variant="h5" align="center"> Overstock Items in Store {storeId} </Typography>
                {/* TODO: To show data in tbular format instead of a JSON, need quality selection + buy functionality*/}
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        getRowId={() => rowIdGenerator_overstock.next().value}
                        rows={overStockRows}
                        columns={columns_overstock}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </Box>
            </div>

            <div>
                {/* View store #3 for example */}
                <Typography variant="h5" align="center"> Missing Items in Store {storeId} </Typography>

                <Typography varant="h6" align="center"> Section Under Construction! To be delivered in the next iteration!!</Typography>
                {/* TODO: To show data in tbular format instead of a JSON, need quality selection + buy functionality*/}
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        getRowId={() => rowIdGenerator_overstock.next().value}
                        rows={rows}
                        columns={columns_overstock}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </Box>
            </div>
            <Footer />
        </div >
    )
}