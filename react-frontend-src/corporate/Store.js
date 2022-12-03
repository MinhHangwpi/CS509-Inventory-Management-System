import NavTabs from "../components/TempNavBarForItrOne";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { useParams } from 'react-router-dom';
import CustomAppBar from "../components/AppBar";
import Footer from "../components/Footer";


var base_url = "https://3fckw1ryka.execute-api.us-east-1.amazonaws.com/Prod/";
var store_report = base_url + "corporateInventoryReportGenerator"

/*
"storeID": "storeID_ABC_XYZ",
    "items: "[ 
                        {"name": "name1", "description": "description1", "price": "5.3", "SKU": "sdfdf", "available quantity": "20", 
                        "item_valuation": "34545"},
                        {"name": "name2", "description": "description2", "price": "5.3", "SKU": "sdfdf", "available quantity": "20",
                      "item_valuation": "34545"},
                        {"name": "name3", "description": "description3", "price": "5.3", "SKU": "sdfdf", "available quantity": "20",
               "item_valuation": "34545"}
                    ]"
    "total_valuation": "$$$_sum_of_all_items*quantity"
**/

const columns = [
    { field: "name", headerName: "Item Name", width: 130 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "SKU", headerName: "SKU", width: 130 },
    { field: "quantity", headerName: "Available Quantity", width: 150 },
    { field: "item_val", headerName: "Item Valuation", width: 150 }
]

const valuation_columns = [
    { field: "total_valuation", headerName: "Total Valuation", width: 250 },
    { field: "total_num_items", headerName: "Total Number of Items", width: 250 }
]

function* generateRowId() {
    let id = 0;
    while (true) {
        yield id++;
    }
}


export default function CorporateStore() {
    //row id generator helper for constructing data grid
    const rowIdGenerator_store = generateRowId();

    //set states for shelfStock and overStock
    const [storeInfoRows, setStoreInfoRows] = React.useState([]);
    const [valuationRows, setValuationRows] = React.useState([]);

    const storeId = useParams().storeId;
    let data = {};
    data['storeID'] = storeId;
    console.log(storeId)

    // //building up the payload; ffirst starting from data, then build a body
    let body = {};
    body['body'] = JSON.stringify(data);

    console.log(body);

    let js = JSON.stringify(body);

    React.useEffect(() => {
        fetch(store_report,
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
                let newstoreInfoRows = data.stock;
                let newvaluationRows = [];
                let valuationRow = { 'total_valuation': '$' + data.total_valuation, 'total_num_items': data.total_num_items };
                newvaluationRows.push(valuationRow);
                setValuationRows(newvaluationRows);

                newstoreInfoRows.forEach(item => item.price = '$' + item.price);
                newstoreInfoRows.forEach(item => item.item_val = '$' + item.item_val);
                setStoreInfoRows(newstoreInfoRows);
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
                <h1>Store Inventory Report for Store {storeId}</h1>
            </div>
            <div>
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        getRowId={() => rowIdGenerator_store.next().value}
                        rows={storeInfoRows} // to change to storeInfoRows
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                </Box>
            </div>
            <div>
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        getRowId={() => rowIdGenerator_store.next().value}
                        rows={valuationRows} // to change to storeInfoRows
                        columns={valuation_columns}
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