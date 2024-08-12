import React from 'react';
import { Box, Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ActiveBannerCard = ({ banner, onEdit, onDelete, onToggleVisibility, showToggle }) => {
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mb: 2, position: 'relative' }}>
            {showToggle && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1
                    }}
                    color="primary"
                    onClick={() => onToggleVisibility(banner.id, banner.isVisible)}
                >
                    {banner.isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            )}
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {banner.description}
                </Typography>
                <Typography color="text.secondary">
                    Timer: {banner.timer} seconds
                </Typography>
                <Typography color="text.secondary">
                    Link: <a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.link}</a>
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(banner)}
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(banner.id)}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </Box>
        </Card>
    );
};

export default ActiveBannerCard;
