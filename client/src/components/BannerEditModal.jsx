import React, { useState, useEffect } from 'react';
import {Box, Typography, TextField, Button, Modal, FormControlLabel, Checkbox, Stack} from '@mui/material';

const BannerEditModal = ({ open, onClose, banner, onSave }) => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [link, setLink] = useState('');

    console.log(isVisible)

    useEffect(() => {
        if (banner) {
            setDescription(banner.description || '');
            setTimer(banner.timer || 0);
            setIsVisible( banner.isVisible === 1);
            setLink(banner.link || '');
        }
    }, [banner]);

    const handleSave = () => {
        onSave({ description, timer, isVisible, link });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-banner-modal"
            aria-describedby="edit-banner-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
            }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Edit Banner
                </Typography>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Timer (seconds)"
                    type="number"
                    value={timer}
                    onChange={(e) => setTimer(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isVisible}
                            onChange={(e) => setIsVisible(e.target.checked)}
                        />
                    }
                    label="Show on Landing Page"
                />
                <Stack spacing={4} direction="row" mt={2}>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Update Banner
                    </Button>
                    <Button onClick={onClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default BannerEditModal;
