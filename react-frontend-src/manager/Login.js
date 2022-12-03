import CustomAppBar from '../components/AppBar.js';
import SignIn from '../components/LoginAppBtn.js';
import Footer from '../components/Footer.js';
import Paper from '@mui/material/Paper';

export default function Manager() {
    return (
        <div>
            <CustomAppBar></CustomAppBar>
            <SignIn userRole="Manager" />
            <Paper sx={{
                marginTop: 'calc(10% + 60px)',
                position: 'fixed',
                bottom: 0,
                width: '100%'
            }} square variant="outlined">
                <Footer />
            </Paper>
        </div>
    )
}