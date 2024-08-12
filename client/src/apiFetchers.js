import axios from 'axios';

// const API_BASE_URL = "http://localhost:5000/api/banner"
const API_BASE_URL = "http://13.201.244.23:5000/api/banner"

export const fetchActiveBanner = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/active`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching active banner');
    }
};

export const deleteBanner = async (bannerId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${bannerId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting banner');
    }
}


export const fetchAllBanners = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching banners');
    }
};

export const createBanner = async (bannerData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, bannerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating banner');
    }
};

export const modifyBanner = async (bannerId, bannerData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${bannerId}`, bannerData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error modifying banner');
    }
};

export const toggleBannerVisibility = async (bannerId, isVisible) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${bannerId}/toggle-visibility`, { isVisible });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error toggling banner visibility');
    }
};
