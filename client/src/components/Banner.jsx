import React, { useState, useEffect } from 'react';
import {Box, Typography, Link as MuiLink, CircularProgress} from '@mui/material';
import { fetchActiveBanner } from '../apiFetchers';
import {formatTimeRemaining} from "../utils";

const Banner = () => {
    const [banner, setBanner] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const loadBanner = async () => {
            try {
                const fetchedBanner = await fetchActiveBanner();
                setBanner(fetchedBanner);
                setTimer(fetchedBanner.timer);
            } catch (error) {
                console.error('Error fetching active banner:', error.message);
            }
        };

        loadBanner();
    }, []);

    useEffect(() => {
        if (timer === 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    if (!banner || !banner.isVisible) return <h1>Active banner not found</h1>;

    return (
        <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 2, borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="h5" component="div">
                {banner.description}
            </Typography>
            <Typography variant="body2" mt={2}>
                {formatTimeRemaining(timer)}
            </Typography>
            <br/>
            <MuiLink href={banner.link} color="secondary" underline="hover">
                Learn More
            </MuiLink>
        </Box>
    );
};

export default Banner;
