const express = require('express');
const { fetchBanner, fetchAllBanners, modifyBanner, createBanner, deleteBanner, toggleBannerVisibility,
    fetchActiveBanner
} = require('../controllers/bannerController');
const router = express.Router();

router.post('/create', createBanner);

router.get('/all', fetchAllBanners);

router.get('/active', fetchActiveBanner);

router.get('/:bannerId', fetchBanner);

router.put('/:bannerId', modifyBanner);

router.delete('/:bannerId', deleteBanner);

router.patch('/:bannerId/toggle-visibility', toggleBannerVisibility)

module.exports = router;
