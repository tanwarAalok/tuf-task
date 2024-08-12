import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, CircularProgress, Divider, Button, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import {fetchAllBanners, deleteBanner, toggleBannerVisibility, modifyBanner, createBanner} from '../apiFetchers';
import ActiveBannerCard from './ActiveBannerCard';
import BannerEditModal from './BannerEditModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InactiveBannerCard from "./InactiveBannerCard";
import BannerCreateModal from "./BannerCreateModal";

const Dashboard = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openCreateModal, setCreateOpenModal] = useState(false);

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const fetchedBanners = await fetchAllBanners();
                fetchedBanners.sort((a, b) => b.isVisible - a.isVisible);
                setBanners(fetchedBanners);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadBanners();
    }, []);

    const handleEdit = (banner) => {
        setSelectedBanner(banner);
        setOpenEditModal(true);
    };

    const handleCreateBanner = async (bannerData) => {
        try{
            await createBanner(bannerData);
            alert('Banner created');
            setCreateOpenModal(false);
            const updatedBanners = await fetchAllBanners();
            setBanners(updatedBanners);
        }
        catch (err) {
            setError(err.message);
        }
    }

    const handleUpdate = async (updatedBanner) => {
        if (!selectedBanner) return;

        try {
            await modifyBanner(selectedBanner.id, updatedBanner);
            alert('Banner updated successfully');
            setOpenEditModal(false);
            const updatedBanners = await fetchAllBanners();
            setBanners(updatedBanners);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (bannerId) => {
        try {
            await deleteBanner(bannerId);
            alert('Banner deleted successfully');
            const updatedBanners = await fetchAllBanners();
            setBanners(updatedBanners);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleVisibility = async (bannerId, currentVisibility) => {
        try {
            await toggleBannerVisibility(bannerId, !currentVisibility);
            const updatedBanners = await fetchAllBanners();
            setBanners(updatedBanners);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    const activeBanner = banners.find(banner => banner.isVisible);
    const otherBanners = banners.filter(banner => !banner.isVisible);

    return (
        <Box sx={{ padding: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" gutterBottom>
                    Welcome, Admin
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCreateOpenModal(true)}
                >
                    Create New Banner
                </Button>
            </Stack>

            {activeBanner ? (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Active Banner
                    </Typography>
                    <ActiveBannerCard
                        banner={activeBanner}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleVisibility={handleToggleVisibility}
                        showToggle={true}
                    />
                </Box>
            ) : (
                <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
                    No active banners
                </Typography>
            )}

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h5" gutterBottom>
                Other Banners
            </Typography>
            <Stack spacing={2}>
                {otherBanners.map((banner) => (
                    <InactiveBannerCard
                        key={banner.id}
                        banner={banner}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleVisibility={handleToggleVisibility}
                        showToggle={true}
                    />
                ))}
            </Stack>

            <BannerEditModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                banner={selectedBanner}
                onSave={handleUpdate}
            />

            <BannerCreateModal
                open={openCreateModal}
                onClose={() => setCreateOpenModal(false)}
                onSave={handleCreateBanner}
            />
        </Box>
    );
};

export default Dashboard;
