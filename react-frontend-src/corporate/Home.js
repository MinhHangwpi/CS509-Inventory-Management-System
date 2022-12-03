import { CardContent, CardHeader, Typography, Grid, Card, Button, Container, Stack, TextField, Box } from "@mui/material";
import CustomAppBar from "../components/AppBar";
import Footer from "../components/Footer";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import NavTabs from "../components/TempNavBarForItrOne";
import { useParams } from "react-router-dom";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import ShowStores from "./ShowStores";
import CorporateStore from "./Store";


var base_url = "https://3fckw1ryka.execute-api.us-east-1.amazonaws.com/Prod/";
var show_stores = base_url + "storesGetter"


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

export default function CorporateHome() {

    const storeId = useParams().storeId;
    // console.log(storeId);
    const [stores, setStores] = React.useState([]);

    // to show all the stores;
    const viewStoresClickHandler = (event) => {

        if (stores.length === 0) {
            //if the card is not showing any managerID, clicking the button will fetch data from server
            fetch(show_stores, {
                method: 'GET', headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("success: ", data);
                    alert(data.result);
                    //set new rows as the rows of stores fetched from the server
                    setStores(data.stores);
                })
                .catch((error) => {
                    console.log('Error: ', error);
                    alert(error);
                })
        } else {
            //if rows have been displayed, a second click will hide the rows.
            setStores([]);
        }

        console.log("Clicked on view button!!")
    }


    const rowIdGenerator = generateRowId();


    return (
        <div>
            <CustomAppBar />

            <Typography variant="h2" align="center">Corporate Homepage</Typography>



            <Container >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} md={3}>
                        <Item sx={{ boxShadow: 0 }}>
                            <Link
                                to={{ pathname: `/corporate/${storeId}/inventory` }}
                                style={{ textDecoration: "none" }}
                            >
                                <Button variant="contained">Create Store</Button>
                            </Link>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Item sx={{ boxShadow: 0 }}>
                            <Link
                                to={{ pathname: `/corporate/createItem` }}
                                style={{ textDecoration: "none" }}
                            >
                                <Button variant="contained">Create Item</Button>
                            </Link>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Item sx={{ boxShadow: 0 }}>
                            <Link
                                to={{ pathname: `/corporate/assignItemLocation` }}
                                style={{ textDecoration: "none" }}
                            >
                                <Button variant="contained">Assign Item Location</Button>
                            </Link>
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Item sx={{ boxShadow: 0 }}>
                            <Link
                                to={{ pathname: `/corporate/assignItemLocation` }}
                                style={{ textDecoration: "none" }}
                            >
                                <Button variant="contained">Generate Total Inventory</Button>
                            </Link>
                        </Item>
                    </Grid>
                </Grid>
                <Grid container spacing={6} >
                    <Grid item sx={12} md={12}>

                        <Card raised>
                            <CardHeader
                                title="Show Stores"
                                titleTypographyProps={{ variant: 'h5', align: 'center' }}
                            />

                            <CardContent style={{ height: 400, width: "100%" }}>
                                <Typography variant="body1"> Click on "Delete" if you want to delete a store</Typography>
                                <Button
                                    variant="contained"
                                    align='center'
                                    onClick={viewStoresClickHandler}
                                > View/ Hide </Button>

                                <ShowStores stores={stores} />

                            </CardContent>
                        </Card>
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