const db = require('../config/db');


const createBanner = async (req, res) => {
    const { description, timer, isVisible, link } = req.body;

    if (!description || timer === undefined || isVisible === undefined || !link) {
        return res.status(400).json({ message: 'Bad request: Missing required fields' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // If the new banner is visible, set all other banners to not visible
        if (isVisible) {
            await connection.query(
                'UPDATE banner SET isVisible = FALSE WHERE isVisible = TRUE'
            );
        }

        // Insert the new banner
        const [result] = await connection.query(
            'INSERT INTO banner (description, timer, isVisible, link, updated_at) VALUES (?, ?, ?, ?, NOW())',
            [description, timer, isVisible, link]
        );

        await connection.commit();
        res.status(201).json({ message: 'Banner created successfully', bannerId: result.insertId });
    } catch (err) {
        await connection.rollback();
        console.error('Error creating banner:', err);
        res.status(500).json({ message: 'Error creating banner', error: err.message });
    } finally {
        connection.release();
    }
};

const fetchAllBanners = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM banner');

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching banner:', err);
        res.status(500).json({ message: 'Error getting banner', error: err.message });
    }
};

const fetchBanner = async (req, res) => {
    const bannerId = req.params.bannerId;

    if (!bannerId) {
        return res.status(400).json({ message: 'Bad request: Missing bannerId parameter' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM banner WHERE id = ?', [bannerId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        const banner = rows[0];
        res.status(200).json(banner);
    } catch (err) {
        console.error('Error fetching banner:', err);
        res.status(500).json({ message: 'Error getting banner', error: err.message });
    }
};

const modifyBanner = async (req, res) => {
    const bannerId = req.params.bannerId;
    const { description, timer, isVisible, link } = req.body;

    if (!bannerId) {
        return res.status(400).json({ message: 'Bad request: Missing bannerId parameter' });
    }

    if (!description || timer === undefined || isVisible === undefined || !link) {
        return res.status(400).json({ message: 'Bad request: Missing required fields' });
    }

    try {
        const [result] = await db.query(
            'UPDATE banner SET description = ?, timer = ?, isVisible = ?, link = ?, updated_at = NOW() WHERE id = ?',
            [description, timer, isVisible, link, bannerId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json({ message: 'Banner updated successfully' });
    } catch (err) {
        console.error('Error modifying banner:', err);
        res.status(500).json({ message: 'Error modifying banner', error: err.message });
    }
};

const deleteBanner = async (req, res) => {
    const { bannerId } = req.params;
    try {
        const [result] = await db.query('DELETE FROM banner WHERE id = ?', [bannerId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (err) {
        console.error('Error deleting banner:', err);
        res.status(500).json({ message: 'Error deleting banner', error: err.message });
    }
};

const toggleBannerVisibility = async (req, res) => {
    const { bannerId } = req.params;
    const { isVisible } = req.body;

    if (isVisible === undefined) {
        return res.status(400).json({ message: 'Bad request: isVisible field is required' });
    }

    try {
        await db.query('START TRANSACTION');

        await db.query('UPDATE banner SET isVisible = false WHERE id != ?', [bannerId]);

        await db.query('UPDATE banner SET isVisible = ? WHERE id = ?', [isVisible, bannerId]);

        await db.query('COMMIT');

        res.status(200).json({ message: 'Banner visibility updated successfully' });
    } catch (err) {
        await db.query('ROLLBACK');
        console.error('Error updating banner visibility:', err);
        res.status(500).json({ message: 'Error updating banner visibility', error: err.message });
    }
};

const fetchActiveBanner = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM banner WHERE isVisible = TRUE LIMIT 1');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No active banner found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching active banner:', err);
        res.status(500).json({ message: 'Error fetching active banner', error: err.message });
    }
};

module.exports = {fetchActiveBanner, fetchBanner, modifyBanner, createBanner, fetchAllBanners, deleteBanner, toggleBannerVisibility };
