import { CardContent, CardHeader, Typography, Grid, Card, Button, Container, Stack, TextField, Box } from "@mui/material";
import CustomAppBar from "../components/AppBar";
import Footer from "../components/Footer";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import ManagerMissing from "./Missing";
import ManagerInventory from "./Inventory";
import { useParams } from "react-router-dom";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';


var base_url = "https://gw41edkp6h.execute-api.us-east-1.amazonaws.com/Prod/";
var processShipment_url = base_url + "equal"; //to replace this one later

/*
{ "shipment": [
         { "item" : "sku-1" , "quantity" : "41" },
         { "item" : "sku-2" , "quantity" : "2" }
    ]
}
*/



// create a nice stylized Item component for a list

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

//generate rowsid
function* generateRowId() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

// helper method to get the difference between shipmentRows and selectedRows;
let isSameRow = (a, b) => a.rowId === b.rowId && a.item === b.item && a.quantity === b.quantity;
const onlyInLeft = (left, right, compareFunction) =>
    left.filter(leftValue =>
        !right.some(rightValue =>
            compareFunction(leftValue, rightValue)));

export default function ManagerHome() {

    const storeId = useParams().storeId;
    // console.log(storeId);

    const date = new Date();

    //Shipment information

    // let shipment_rows = [
    //     { rowId: 1, item: "DRJ297831", quantity: "20" },
    //     { rowId: 2, item: "JK199283", quantity: "2" },
    //     { rowId: 3, item: "JK199283", quantity: "5" }
    // ]

    const shipment_columns = [
        { field: 'item', headerName: 'Item Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 90 },
    ]


    // const [shipmentRows, setShipmentRows] = React.useState(shipment_rows);
    const [shipmentRows, setShipmentRows] = React.useState([]);
    const [shipmentText, setShipmentText] = React.useState("");

    const enterShipmentHandler = () => {
        let newShipmentRows = JSON.parse(shipmentText).shipment;  // [{ "item" : "sku-1" , "quantity" : "41" },{ "item" : "sku-2" , "quantity" : "2" }]
        setShipmentRows(newShipmentRows);
        setShipmentText("");
    }


    // to send a request to server upon a click on button "process shipment"
    const processShipmentHandler = () => {
        //if shipment_rows is empty then can't process
        let data = {};
        data['items'] = shipmentRows;
        data['store'] = storeId;
        // console.log(data);

        //building up the payload; ffirst starting from data, then build a body
        let body = {};
        body['body'] = JSON.stringify(data);

        // console.log(body);

        let js = JSON.stringify(body);
        // console.log(js);

        //send the data using a fetch request
        fetch(processShipment_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: js,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode == 200) {
                    console.log("success: ", data);
                    alert(data.result);

                } else {
                    console.log("failture: ", data);
                    alert("Failure to process shipment!! Please check with Corporate to see if this item has been assigned a location!");
                }

            })
            .catch((error) => {
                console.log('Error: ', error);
                alert(error);
            })
    }

    const rowIdGenerator = generateRowId();


    return (
        <div>
            <CustomAppBar />

            <Typography variant="h2" align="center">Manager Homepage</Typography>
            <Typography variant="h4" align="center" > Store # {storeId}</Typography>

            <Container>
                <Grid container spacing={6} >

                    <Grid item sx={12} md={6}>
                        <Card raised>
                            <CardHeader
                                title="Enter Shipment"
                            />
                            <CardContent style={{ height: 400, width: "100%" }}>
                                <TextField
                                    onChange={(e) => setShipmentText(e.target.value)}
                                    value={shipmentText}
                                    multiline
                                    label="Shipment Object"
                                    variant="outlined"
                                    color="secondary"
                                    required
                                    style={{ width: 525 }}
                                />
                                <Button variant="contained" onClick={enterShipmentHandler}>OK!!</Button>
                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid item sx={12} md={6}>
                        <Card raised>
                            <CardHeader
                                title="Preview Your Shipment"
                                subheader={`As of ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`}
                            />
                            <CardContent style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    getRowId={() => rowIdGenerator.next().value}
                                    rows={shipmentRows}
                                    columns={shipment_columns}
                                    pageSize={5}
                                    rowHeight={40}
                                    rowsPerPageOptions={[5]}
                                />

                            </CardContent>
                            <Button variant="contained" onClick={processShipmentHandler}>Process Shipment</Button>
                        </Card>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6} md={3}>
                            <Item >
                                <Link
                                    to={{ pathname: `/manager/${storeId}/missing` }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button variant="contained">Show Missing Items</Button>
                                </Link>
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Item >
                                <Link
                                    to={{ pathname: `/manager/${storeId}/inventory` }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button variant="contained">Generate Inventory Report</Button>
                                </Link>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Paper sx={{
                marginTop: 'calc(10% + 60px)',
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }} square variant="outlined">
                <Footer />
            </Paper>
        </div >
    )
}