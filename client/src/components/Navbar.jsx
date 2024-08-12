import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isDashboard }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {isDashboard ? 'Internal Dashboard' : 'Dynamic Banner Website'}
                </Typography>
                {isDashboard ? (
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
