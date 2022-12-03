import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomAppBar from './AppBar';
import { Button, Grid } from '@mui/material';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <CustomAppBar />
            <Grid container>
                <Grid item xs={12} align="center">
                    <img src="http://0effortthemes.com/unauthorized-error-page/demo/images/landing/thumb-5.jpg" alt="unauthorized-page" />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        onClick={() => {
                            navigate('/', { replace: true });

                        }}
                        variant="contained">
                        Go Back To Customer Homepage</Button>
                </Grid>
            </Grid>
        </div >
    )
}

export default UnauthorizedPage;