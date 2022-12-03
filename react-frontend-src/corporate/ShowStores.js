import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";



/**"stores": [
    {
      "name": "Worcester",
      "storeID": "29210230-5ea4-11ed-b",
      "storeManagerID": "71a9de60-1e16-465d-8",
      "longitude": 42.2686,
      "latitude": -71.8093
    }
  ], */

const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
        field: "name",
        headerName: "Store Name",
        width: 120
    },
    {
        field: "storeID",
        headerName: "storeID",
        width: 180
    },
    {
        field: "storeManagerID",
        headerName: "Manager ID",
        width: 180
    },
    {
        field: "longitude",
        headerName: "Longitude",
        type: "number",
        width: 100
    },
    {
        field: "latitude",
        headerName: "latitude",
        type: "number",
        width: 100
    },
    {
        field: "Generate",
        width: 200,
        renderCell: (rowValues) => {
            return (
                <Link
                    to={`/corporate/${rowValues.row.storeID}/storeInventory`}
                    style={{ textDecoration: "none" }}
                >
                    <Button variant="contained">Inventory Report</Button>
                </Link>
            )
        },
        width: 220
    },
    {
        field: "Action",
        width: 200,
        renderCell: (rowValues) => {
            return (
                // <Link
                //     to={`/manager/${rowValues.row.storeID}/home`}
                //     style={{ textDecoration: "none" }}
                // >
                <Button variant="contained">Delete store</Button>
                // </Link>
            )
        },
        width: 220
    }
]

function* generateRowId() {
    let id = 0;
    while (true) {
        yield id++;
    }
}


export default function ShowStores(props) {

    const params = useParams();
    const rowIdGenerator = generateRowId();

    //filter based on storeid so we must get the storeid passed down from the landing page
    return (
        <div>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    getRowId={() => rowIdGenerator.next().value}
                    rows={props.stores}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </div>
    )
}
