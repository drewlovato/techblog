const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);

module.exports = router;