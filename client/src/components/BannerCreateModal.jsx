import React, { useState, useEffect } from 'react';
import {Box, Typography, TextField, Button, Modal, FormControlLabel, Checkbox, Stack} from '@mui/material';

const BannerCreateModal = ({ open, onClose, onSave }) => {
    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [link, setLink] = useState('');


    const handleSave = () => {
        onSave({ description, timer, isVisible, link });
        setDescription('');
        setTimer(0)
        setLink('')
        setIsVisible(false)
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
                    Create New Banner
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
                        Create Banner
                    </Button>
                    <Button onClick={onClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default BannerCreateModal;
