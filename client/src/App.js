import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar'; // Adjust the path as needed
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';

const AppContent = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <>
            <Navbar isDashboard={isDashboard} />
            <Container>
                <Box sx={{ mt: 4 }}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<Banner />} />
                        {/* Add a route for creating a new banner if needed */}
                    </Routes>
                </Box>
            </Container>
        </>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
