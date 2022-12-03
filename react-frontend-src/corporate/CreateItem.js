
import NavTabs from "../components/TempNavBarForItrOne";
import { TextField, Typography, Paper, Grid, Card, CardHeader, CardContent, Container } from "@mui/material";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState } from "react";
import Footer from "../components/Footer";
import ShowCorporateItems from "./ShowItems";
import CustomAppBar from "../components/AppBar";


var base_url = "https://3fckw1ryka.execute-api.us-east-1.amazonaws.com/Prod/";
var createItem_url = base_url + "itemCreator";
var show_items_url = base_url + "itemsGetter";


export default function CorporateCreateItem() {

    const ariaLabel = { 'aria-label': 'description' };
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [sku, setSKU] = useState("")
    const [price, setPrice] = useState("")
    const [maxQuantity, setMaxQuantity] = useState("")
    const [rows, setRows] = useState([])

    const handleButtonPress = (event) => {
        event.preventDefault();
        console.log({ name, description, sku, price, maxQuantity });
        let data = {};
        data['SKU'] = sku;
        data['name'] = name;
        data['description'] = description;
        data['price'] = price;
        data['maxQuantity'] = maxQuantity;

        //building up the payload; first starting from data, then build a body
        let body = {};
        body['body'] = JSON.stringify(data);
        console.log(body);
        let js = JSON.stringify(body);

        //send the data using a fetch request
        fetch(createItem_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: js,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("success: ", data.result);
                alert(data.result);
            })
            .catch((error) => {
                console.log('Error: ', error);
                alert(error);
            })
        //reset form data to earlier state regardless of fetch outcomes
        setName("");
        setSKU("");
        setDescription("");
        setPrice("");
        setMaxQuantity("");

    }

    const viewClickHandler = (event) => {

        if (rows.length === 0) {
            //if the card is not showing any rows, clicking the button will fetch data from server
            fetch(show_items_url, {
                method: 'GET', headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("success: ", data);
                    alert("Successfully fetched item!!");
                    //set new rows as the rows of items fetched from the server
                    setRows(data.items);
                })
                .catch((error) => {
                    console.log('Error: ', error);
                    alert(error);
                })
        } else {
            //if rows have been displayed, a second click will hide the rows.
            setRows([]);
        }
    }

    return (
        <div>
            <CustomAppBar />
            <Typography variant="h4" align="center">Corporate Create Item</Typography>

            <Container>
                <Grid container spacing={6} >
                    <Grid item sx={12} md={6}>
                        <Card raised>
                            <CardHeader
                                title="Fill Out The Follow Fields To Create An Item"
                                titleTypographyProps={{ variant: 'h5', align: 'center' }}
                            />
                            <CardContent style={{ height: 400, width: "100%" }}>
                                <form nonvalidate autoComplete="off"
                                    onSubmit={handleButtonPress}
                                >
                                    <Grid container direction={"column"} spacing={1}>

                                        <Grid item>
                                            <TextField
                                                onChange={(e) => setSKU(e.target.value)}
                                                value={sku}
                                                label="SKU"
                                                variant="outlined"
                                                color="secondary"
                                                required
                                                style={{ width: 525 }}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <TextField
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                label="name"
                                                style={{ width: 525 }}
                                                variant="outlined"
                                                color="secondary"
                                                required
                                            />
                                        </Grid>

                                        <Grid item>
                                            <TextField
                                                onChange={(e) => setDescription(e.target.value)}
                                                value={description}
                                                label="description"
                                                style={{ width: 525 }}
                                                variant="outlined"
                                                color="secondary"
                                                required
                                            />
                                        </Grid>

                                        <Grid item>
                                            <TextField
                                                onChange={(e) => setPrice(e.target.value)}
                                                value={price}
                                                label="price"
                                                variant="outlined"
                                                color="secondary"
                                                required
                                                style={{ width: 525 }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                onChange={(e) => setMaxQuantity(e.target.value)}
                                                value={maxQuantity}
                                                label="maxQuantity"
                                                variant="outlined"
                                                color="secondary"
                                                required
                                                style={{ width: 525 }}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{ width: 525 }}
                                            >
                                                Create Item
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sx={12} md={6}>

                        <Card raised>
                            <CardHeader
                                title="View Corporate Items"
                                titleTypographyProps={{ variant: 'h5', align: 'center' }}
                            />
                            <CardContent style={{ height: 400, width: "100%" }}>
                                <Button
                                    variant="contained"
                                    align='center'
                                    onClick={viewClickHandler}
                                > View/ Hide </Button>
                                <ShowCorporateItems rows={rows} />
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
        </div>
    );
}