import Welcome from '../components/Welcome';
import CustomAppBar from '../components/AppBar';
import Footer from '../components/Footer.js';
import ComposedTextField from '../components/TextField';
import Grid from '@mui/material/Grid';
import InteractiveList from '../components/OutputTextField';
import * as React from 'react';
//to calculate distance between two coordinates.
// import collect from '@turf/collect';
import NavTabs from '../components/TempNavBarForItrOne';
import { Typography } from '@mui/material';

// const mbxGeocoding = import('@mapbox/mapbox-sdk/services/geocoding');

const MY_ACCESS_TOKEN = "pk.eyJ1IjoibWh0aHJvdzA5MDkwOSIsImEiOiJjbDlrYnN6bDcxdTVvM3dtbjRqMWJmc3NxIn0.8ZG33j9q4A_4waXCr6NPEg"
// const geocoder = mbxGeocoding({ accessToken: MY_ACCESS_TOKEN });


function* generateButtonId() {
    let id = 0;
    while (true) {
        yield id++;
    }
}


export default function Customer() {

    const [stores1, setStores1] = React.useState([]);
    const [stores2, setStores2] = React.useState([]);

    const clickViewStoresHandler = (isShown, buttonId) => {
        if (isShown) {
            if (buttonId === "" + 0) {
                //TODO: replace with logic specific to fetching stores based on customer ZIP Code
                fetch("http://localhost:8080/stores")
                    .then(res => {
                        return res.json(); //res.json() is also async too
                    })
                    .then(data => {
                        setStores1(data);
                    })
            } else if (buttonId === "" + 1) {
                //TODO: replace with logic specific to fetching stores based on searched items.
                fetch("http://localhost:8080/stores")
                    .then(res => {
                        return res.json(); //res.json() is also async too
                    })
                    .then(data => {
                        setStores2(data);
                    })
            }
        } else { //if isShown === false
            setStores1([]);
            setStores2([]);
        }
    }

    let idGenerator = generateButtonId();

    return (
        <div>
            <CustomAppBar />
            <h1> Customer Landing Page!</h1>
            {/* TODO */}


            {/* DO NOT DELETE THE FOLLOWING */}
            <Welcome />

            <Grid container>
                <Grid item>
                    <ComposedTextField
                        inputLabel="Enter Your ZIP Code"
                        formHelperText="To view list of stores near you, sorted by distance"
                        isSubmitClick={clickViewStoresHandler}
                        passedId={`${idGenerator.next().value}`}
                    />
                </Grid>

                {stores1.length === 0 ? <p>Sorry! No Stores near you or the ZIP Code you entered is invalid</p> : <InteractiveList storeLists={stores1} />}

            </Grid>

            <Grid container>
                <Grid item>
                    <ComposedTextField
                        inputLabel="Enter Item Name or SKU"
                        formHelperText="To view list of stores near you, sorted by distance"
                        isSubmitClick={clickViewStoresHandler}
                        passedId={`${idGenerator.next().value}`}
                    />
                </Grid>

                {stores2.length === 0 ? <p>Sorry! No sorry near you or the ZIP Code you entered is invalid</p> : <InteractiveList storeLists={stores2} />}

            </Grid>

            <Footer sx={{ mt: 8, mb: 4, position: 'fixed', bottom: 0, width: '100%' }}
                component="footer"  variant="outlined"></Footer>
        </div>
    )
}