import CustomAppBar from "../components/AppBar";
import Footer from "../components/Footer";
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";

const columns_shelf = [
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
        field: "SKU",
        headerName: "SKU",
        type: "number",
        width: 120
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
        field: "isSoldOut",
        headerName: "Sold out/Missing",
        width: 200
    },
    // {
    //     field: "Route",
    //     renderCell: (rowValues) => {
    //         return (
    //             // TODO: To truly implement the "Fill Shelf" use case
    //             <Button variant="contained" onClick={() => alert("Fill shelf successful!!!")}>
    //                 Fill Shelf
    //             </Button>
    //         )
    //     },
    //     width: 160
    // }
];

const rows = [];


export default function ManagerMissing() {
    return (
        <div>
            <CustomAppBar />
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns_shelf}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Box>


            <Footer />
        </div>
    )
}