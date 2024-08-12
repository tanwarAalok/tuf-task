import React from 'react';
import { Card, CardContent, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const InactiveBannerCard = ({ banner, onEdit, onDelete, onToggleVisibility, showToggle }) => {
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="div">
                    {banner.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Timer: {banner.timer} seconds
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Link: <a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.link}</a>
                </Typography>
            </CardContent>

            <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
                <Tooltip title="Edit Banner">
                    <IconButton onClick={() => onEdit(banner)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Banner">
                    <IconButton onClick={() => onDelete(banner.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={banner.isVisible ? "Hide Banner" : "Show Banner"}>
                    <IconButton
                        onClick={() => onToggleVisibility(banner.id, banner.isVisible)}
                    >
                        {banner.isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                </Tooltip>
            </Stack>
        </Card>
    );
};

export default InactiveBannerCard;
